package com.maciekbulanda.tasker.services;

import com.maciekbulanda.tasker.documents.Group;
import com.maciekbulanda.tasker.repository.GroupRepository;
import org.reactivestreams.Publisher;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GroupService implements GroupRepository {

    private final GroupRepository groupRepository;
    private final ReactiveMongoTemplate reactiveMongoTemplate;


    public GroupService(GroupRepository groupRepository, ReactiveMongoTemplate reactiveMongoTemplate) {
        this.groupRepository = groupRepository;
        this.reactiveMongoTemplate = reactiveMongoTemplate;
    }

    @Override
    public <S extends Group> Mono<S> insert(S entity) {
        return groupRepository.insert(entity);
    }

    @Override
    public <S extends Group> Flux<S> insert(Iterable<S> entities) {
        return groupRepository.insert(entities);
    }

    @Override
    public <S extends Group> Flux<S> insert(Publisher<S> entities) {
        return groupRepository.insert(entities);
    }

    @Override
    public <S extends Group> Mono<S> findOne(Example<S> example) {
        return groupRepository.findOne(example);
    }

    @Override
    public <S extends Group> Flux<S> findAll(Example<S> example) {
        return groupRepository.findAll(example);
    }

    @Override
    public <S extends Group> Flux<S> findAll(Example<S> example, Sort sort) {
        return groupRepository.findAll(example, sort);
    }

    @Override
    public <S extends Group> Mono<Long> count(Example<S> example) {
        return groupRepository.count(example);
    }

    @Override
    public <S extends Group> Mono<Boolean> exists(Example<S> example) {
        return groupRepository.exists(example);
    }

    @Override
    public Flux<Group> findAll(Sort sort) {
        return groupRepository.findAll(sort);
    }

    @Override
    public <S extends Group> Mono<S> save(S s) {
        return groupRepository.save(s);
    }

    @Override
    public <S extends Group> Flux<S> saveAll(Iterable<S> iterable) {
        return groupRepository.saveAll(iterable);
    }

    @Override
    public <S extends Group> Flux<S> saveAll(Publisher<S> publisher) {
        return groupRepository.saveAll(publisher);
    }

    @Override
    public Mono<Group> findById(String s) {
        return groupRepository.findById(s);
    }

    @Override
    public Mono<Group> findById(Publisher<String> publisher) {
        return groupRepository.findById(publisher);
    }

    @Override
    public Mono<Boolean> existsById(String s) {
        return groupRepository.existsById(s);
    }

    @Override
    public Mono<Boolean> existsById(Publisher<String> publisher) {
        return groupRepository.existsById(publisher);
    }

    @Override
    public Flux<Group> findAll() {
        return groupRepository.findAll();
    }

    @Override
    public Flux<Group> findAllById(Iterable<String> iterable) {
        return groupRepository.findAllById(iterable);
    }

    @Override
    public Flux<Group> findAllById(Publisher<String> publisher) {
        return groupRepository.findAllById(publisher);
    }

    @Override
    public Mono<Long> count() {
        return groupRepository.count();
    }

    @Override
    public Mono<Void> deleteById(String s) {
        return groupRepository.deleteById(s);
    }

    @Override
    public Mono<Void> deleteById(Publisher<String> publisher) {
        return groupRepository.deleteById(publisher);
    }

    @Override
    public Mono<Void> delete(Group group) {
        return groupRepository.delete(group);
    }

    @Override
    public Mono<Void> deleteAll(Iterable<? extends Group> iterable) {
        return groupRepository.deleteAll(iterable);
    }

    @Override
    public Mono<Void> deleteAll(Publisher<? extends Group> publisher) {
        return groupRepository.deleteAll(publisher);
    }

    @Override
    public Mono<Void> deleteAll() {
        return groupRepository.deleteAll();
    }

    public Flux<Group> findByUsers(String user) {
        return reactiveMongoTemplate
                .find(Query.query(Criteria.where("users").is(user)), Group.class);
    }
}
