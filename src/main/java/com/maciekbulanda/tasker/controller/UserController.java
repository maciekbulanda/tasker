package com.maciekbulanda.tasker.controller;

import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.dto.UserDTO;
import com.maciekbulanda.tasker.services.UserService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private final UserService userRepository;

    public UserController(UserService userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Flux<UserDTO> getUsers() {
        return userRepository.findAll().map(User::toUserDTO).map(UserDTO::withNoPass);
    }

    @GetMapping("/{id}")
    public Mono<UserDTO> gatUserById(@PathVariable String id) {
        return userRepository.findById(id).map(User::toUserDTO).map(UserDTO::withNoPass);
    }

    @PutMapping
    public Mono<UserDTO> updateUser(@RequestBody UserDTO updatedUser) {
        return userRepository.save(updatedUser.toUser()).map(User::toUserDTO).map(UserDTO::withNoPass);
    }
}
