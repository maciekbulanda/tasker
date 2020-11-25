package com.maciekbulanda.tasker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockUser;

@SpringBootTest
@AutoConfigureWebTestClient
class GroupControllerTest {

    @Autowired
    WebTestClient webTestClient;

    @Test
    public void groupNamesExpectUnauthorized() {
        webTestClient
                .get()
                .uri("http://localhost:8080/api/usergroupnames")
                .exchange()
                .expectStatus()
                .isUnauthorized();
    }

    @Test
    public void groupNamesExpectOk() {
        webTestClient
                .mutateWith(mockUser().authorities("ROLE_USER"))
                .get()
                .uri("http://localhost:8080/api/usergroupnames")
                .exchange()
                .expectStatus()
                .isOk();
    }

    @Test
    public void groupNamesExpectJson() {
        webTestClient
                .mutateWith(mockUser().authorities("ROLE_USER"))
                .get()
                .uri("http://localhost:8080/api/usergroupnames")
                .exchange()
                .expectBody()
                .jsonPath("$[*]").isArray();
    }
}