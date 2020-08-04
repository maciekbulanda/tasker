package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.services.TaskService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
}
