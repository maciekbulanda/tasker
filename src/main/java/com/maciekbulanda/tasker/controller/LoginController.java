package com.maciekbulanda.tasker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class LoginController {

    @GetMapping(value = "/login")
    Mono<Void> startLogin() {
        return null;
    }
}
