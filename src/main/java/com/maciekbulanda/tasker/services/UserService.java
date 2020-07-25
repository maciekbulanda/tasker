package com.maciekbulanda.tasker.services;

import com.maciekbulanda.tasker.documents.User;
import com.maciekbulanda.tasker.repository.UserRepository;
import org.reactivestreams.Publisher;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class UserService implements UserRepository {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public <S extends User> Mono<S> insert(S s) {
        return userRepository.insert(s);
    }

    @Override
    public <S extends User> Flux<S> insert(Iterable<S> iterable) {
        return userRepository.insert(iterable);
    }

    @Override
    public <S extends User> Flux<S> insert(Publisher<S> publisher) {
        return userRepository.insert(publisher);
    }

    @Override
    public <S extends User> Mono<S> findOne(Example<S> example) {
        return userRepository.findOne(example);
    }

    @Override
    public <S extends User> Flux<S> findAll(Example<S> example) {
        return userRepository.findAll(example);
    }

    @Override
    public <S extends User> Flux<S> findAll(Example<S> example, Sort sort) {
        return userRepository.findAll(example, sort);
    }

    @Override
    public <S extends User> Mono<Long> count(Example<S> example) {
        return userRepository.count(example);
    }

    @Override
    public <S extends User> Mono<Boolean> exists(Example<S> example) {
        return userRepository.exists(example);
    }

    @Override
    public Flux<User> findAll(Sort sort) {
        return userRepository.findAll(sort);
    }

    @Override
    public <S extends User> Mono<S> save(S entity) {
        return userRepository.save(entity);
    }

    @Override
    public <S extends User> Flux<S> saveAll(Iterable<S> entities) {
        return userRepository.saveAll(entities);
    }

    @Override
    public <S extends User> Flux<S> saveAll(Publisher<S> entityStream) {
        return userRepository.saveAll(entityStream);
    }

    @Override
    public Mono<User> findById(String s) {
        return userRepository.findById(s);
    }

    @Override
    public Mono<User> findById(Publisher<String> id) {
        return userRepository.findById(id);
    }

    @Override
    public Mono<Boolean> existsById(String s) {
        return userRepository.existsById(s);
    }

    @Override
    public Mono<Boolean> existsById(Publisher<String> id) {
        return userRepository.existsById(id);
    }

    @Override
    public Flux<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Flux<User> findAllById(Iterable<String> strings) {
        return userRepository.findAllById(strings);
    }

    @Override
    public Flux<User> findAllById(Publisher<String> idStream) {
        return userRepository.findAllById(idStream);
    }

    @Override
    public Mono<Long> count() {
        return userRepository.count();
    }

    @Override
    public Mono<Void> deleteById(String s) {
        return userRepository.deleteById(s);
    }

    @Override
    public Mono<Void> deleteById(Publisher<String> id) {
        return userRepository.deleteById(id);
    }

    @Override
    public Mono<Void> delete(User entity) {
        return userRepository.delete(entity);
    }

    @Override
    public Mono<Void> deleteAll(Iterable<? extends User> entities) {
        return userRepository.deleteAll(entities);
    }

    @Override
    public Mono<Void> deleteAll(Publisher<? extends User> entityStream) {
        return userRepository.deleteAll(entityStream);
    }

    @Override
    public Mono<Void> deleteAll() {
        return userRepository.deleteAll();
    }

    @Override
    public Mono<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
