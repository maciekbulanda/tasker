package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.services.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private final UserService userRepository;

    public UserController(UserService userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Flux<User> getUsers() {
        return userRepository.findAll();
    }
}
