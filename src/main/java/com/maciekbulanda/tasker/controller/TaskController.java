package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.CountedTag;
import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.services.TaskService;
import com.maciekbulanda.tasker.services.UserService;
import org.springframework.web.bind.annotation.*;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    Flux<Task> getTasks(Principal principal) {
        return taskService.findAll().flatMap(task -> {
            Optional<String> ownerId = Optional.ofNullable(task.getOwner());
                return Mono.just(ownerId)
                        .flatMap(id -> id.isPresent() ? userService.findById(id.get()) : Mono.just(new User()))
                        .map(user -> task.withOwner(user.getUsername()))
                        .switchIfEmpty(Mono.just(task));
        });
    }

    @PostMapping
    Mono<Task> insertNewTask(Principal principal, @RequestBody Task newTask) {
        return userService
                .findByUsername(principal.getName())
                .map(User::getId)
                .flatMap(id -> taskService.insert(newTask.withOwner(id)));
    }

    @PutMapping
    Mono<Task> updateTask(@RequestBody Task task) {
        return taskService.save(task);
    }

    @DeleteMapping
    Mono<Void> deleteTask(@RequestParam String id) {
        return taskService.deleteById(id);
    }

    @GetMapping(value = "/tags")
    Mono<List<CountedTag>> getAllTags(Principal principal) {
        return taskService.finAllTagsWithCountersForUser(principal.getName()).collectList();
    }
}
