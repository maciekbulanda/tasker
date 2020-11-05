package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.Group;
import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.services.GroupService;
import com.maciekbulanda.tasker.services.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class GroupController {
    private final GroupService groupService;
    private final UserService userService;

    public GroupController(GroupService groupService, UserService userService) {
        this.groupService = groupService;
        this.userService = userService;
    }

    @GetMapping("/usergroupnames")
    public Mono<List<String>> getGroupNamesForUser(Principal principal) {
        return userService.findByUsername(principal.getName())
                .flatMapMany(user -> groupService.findByUsers(user.getId()))
                .map(Group::getName)
                .collectSortedList();
    }

    @GetMapping("/groups")
    public Flux<Group> getGroupsForUser() {
        return groupService.findAll();
/*
                .flatMap(group -> userService.findAllById(group.getUsers())
                            .map(User::getUsername)
                            .collect(Collectors.toSet())
                            .map(group::withUsers));
*/
    }
}