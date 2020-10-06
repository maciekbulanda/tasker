package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.Group;
import com.maciekbulanda.tasker.services.GroupService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/groups")
public class GroupController {
    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public Mono<List<String>> getGroupsForUser(Principal principal) {
        return groupService.findByUsers(principal.getName())
                .map(Group::getName)
                .collectSortedList();
    }
}
