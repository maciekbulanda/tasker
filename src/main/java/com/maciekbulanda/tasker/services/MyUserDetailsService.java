package com.maciekbulanda.tasker.services;

import com.maciekbulanda.tasker.repository.UserRepositoryImp;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class MyUserDetailsService implements ReactiveUserDetailsService {

    private final UserRepositoryImp userRepositoryImp;

    public MyUserDetailsService(UserRepositoryImp userRepositoryImp) {
        this.userRepositoryImp = userRepositoryImp;
    }

    @Override
    public Mono<UserDetails> findByUsername(String s) {
        return userRepositoryImp.findByUsername(s).cast(UserDetails.class);
    }
}
