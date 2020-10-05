package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.Group;
import com.maciekbulanda.tasker.services.GroupService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.security.Principal;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/groups")
public class GroupController {
    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public Flux<Group> getGroupsForUser(Principal principal) {
        return Flux.just(new Group("id", "askom", Set.of("maciek"), Set.of("maciek") ));
    }
}
