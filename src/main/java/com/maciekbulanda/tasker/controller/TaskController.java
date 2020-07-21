package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.Task;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/tasks")
public class TaskController {

    @GetMapping
    Flux<Task> getTasks() {
        return Flux.fromArray(new Task[] {new Task("1", "task")});
    }
}
