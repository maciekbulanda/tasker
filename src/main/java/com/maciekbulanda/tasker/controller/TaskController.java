package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.CountedTag;
import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    Flux<Task> getTasks() {
        return taskService.findAll();
    }

    @PostMapping
    Mono<Task> insertNewTask(@RequestBody Task newTask) {
        return taskService.insert(newTask);
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
