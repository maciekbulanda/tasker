package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.CountedTag;
import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.services.GroupService;
import com.maciekbulanda.tasker.services.TaskService;
import com.maciekbulanda.tasker.services.UserService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final GroupService groupService;

    public TaskController(TaskService taskService, UserService userService, GroupService groupService) {
        this.taskService = taskService;
        this.userService = userService;
        this.groupService = groupService;
    }

    @GetMapping
    Flux<Task> getTasks(Principal principal) {
        return taskService.findAll()
                .flatMap(task -> Mono.just(principal.getName())
                .flatMap(userService::findByUsername) //User
                .flatMapMany(user -> groupService.findByUsers(user.getUsername())) //Groups
                .flatMap(group -> taskService.findAllByGroup(group.getName())));
    }

    @PostMapping
    Mono<Task> insertNewTask(Principal principal, @RequestBody Task newTask) {
        return userService
                .findByUsername(principal.getName())
                .map(User::getId)
                .flatMap(id -> taskService.insert(newTask.withOwner(id)))
                .map(task -> task.withOwner(principal.getName()));
    }

    @PutMapping
    Mono<Task> updateTask(@RequestBody Task task) {
        return taskService.save(task);
    }

    @DeleteMapping("/{id}")
    Mono<Void> deleteTask(@PathVariable String id) {
        return taskService.deleteById(id);
    }

    @GetMapping(value = "/tags")
    Mono<List<CountedTag>> getAllTags(Principal principal) {
        return taskService.finAllTagsWithCountersForUser(principal.getName()).collectList();
    }
}