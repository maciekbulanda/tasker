package com.maciekbulanda.tasker.services;

import com.maciekbulanda.tasker.CountedTag;
import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.repository.TaskRepository;
import com.maciekbulanda.tasker.repository.UserRepository;
import org.reactivestreams.Publisher;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TaskService implements TaskRepository {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ReactiveMongoTemplate reactiveMongoTemplate) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.reactiveMongoTemplate = reactiveMongoTemplate;
    }

    @Override
    public <S extends Task> Mono<S> insert(S s) {
        return taskRepository.insert(s);
    }

    @Override
    public <S extends Task> Flux<S> insert(Iterable<S> iterable) {
        return taskRepository.insert(iterable);
    }

    @Override
    public <S extends Task> Flux<S> insert(Publisher<S> publisher) {
        return taskRepository.insert(publisher);
    }

    @Override
    public <S extends Task> Mono<S> findOne(Example<S> example) {
        return taskRepository.findOne(example);
    }

    @Override
    public <S extends Task> Flux<S> findAll(Example<S> example) {
        return taskRepository.findAll(example);
    }

    @Override
    public <S extends Task> Flux<S> findAll(Example<S> example, Sort sort) {
        return taskRepository.findAll(example, sort);
    }

    @Override
    public <S extends Task> Mono<Long> count(Example<S> example) {
        return taskRepository.count(example);
    }

    @Override
    public <S extends Task> Mono<Boolean> exists(Example<S> example) {
        return taskRepository.exists(example);
    }

    @Override
    public Flux<Task> findAll(Sort sort) {
        return taskRepository.findAll(sort);
    }

    @Override
    public <S extends Task> Mono<S> save(S entity) {
        return taskRepository.save(entity);
    }

    @Override
    public <S extends Task> Flux<S> saveAll(Iterable<S> entities) {
        return taskRepository.saveAll(entities);
    }

    @Override
    public <S extends Task> Flux<S> saveAll(Publisher<S> entityStream) {
        return taskRepository.saveAll(entityStream);
    }

    @Override
    public Mono<Task> findById(String s) {
        return taskRepository.findById(s);
    }

    @Override
    public Mono<Task> findById(Publisher<String> id) {
        return taskRepository.findById(id);
    }

    @Override
    public Mono<Boolean> existsById(String s) {
        return taskRepository.existsById(s);
    }

    @Override
    public Mono<Boolean> existsById(Publisher<String> id) {
        return taskRepository.existsById(id);
    }

    @Override
    public Flux<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Flux<Task> findAllById(Iterable<String> strings) {
        return taskRepository.findAllById(strings);
    }

    @Override
    public Flux<Task> findAllById(Publisher<String> idStream) {
        return taskRepository.findAllById(idStream);
    }

    @Override
    public Mono<Long> count() {
        return taskRepository.count();
    }

    @Override
    public Mono<Void> deleteById(String s) {
        return taskRepository.deleteById(s);
    }

    @Override
    public Mono<Void> deleteById(Publisher<String> id) {
        return taskRepository.deleteById(id);
    }

    @Override
    public Mono<Void> delete(Task entity) {
        return taskRepository.delete(entity);
    }

    @Override
    public Mono<Void> deleteAll(Iterable<? extends Task> entities) {
        return taskRepository.deleteAll(entities);
    }

    @Override
    public Mono<Void> deleteAll(Publisher<? extends Task> entityStream) {
        return taskRepository.deleteAll(entityStream);
    }

    @Override
    public Mono<Void> deleteAll() {
        return taskRepository.deleteAll();
    }


    public Flux<CountedTag> findAllTagsWithCounters() {
        return reactiveMongoTemplate
                .aggregate(Aggregation.newAggregation(Aggregation.unwind("tags"),
                        Aggregation.group("tags").count().as("count"),
                        Aggregation.sort(Sort.Direction.DESC, "count")), Task.class, CountedTag.class);
    }

    public Flux<CountedTag> finAllTagsWithCountersForGroup(String groupName) {
        return reactiveMongoTemplate
                .aggregate(Aggregation.newAggregation(
                        Aggregation.match(Criteria.where("group").is(groupName)),
                        Aggregation.unwind("tags"),
                        Aggregation.group("tags").count().as("count"),
                        Aggregation.sort(Sort.Direction.DESC, "count")), Task.class, CountedTag.class);

    }

    public Flux<CountedTag> finAllTagsWithCountersForUser(String userName) {
        return userRepository.findByUsername(userName)
                .flatMapMany(user -> reactiveMongoTemplate
                            .aggregate(Aggregation.newAggregation(
                                    Aggregation.match(Criteria.where("owner").is(user.getId())),
                                    Aggregation.unwind("tags"),
                                    Aggregation.group("tags").count().as("count"),
                                    Aggregation.sort(Sort.Direction.DESC, "count")), Task.class, CountedTag.class));
    }

    public Flux<String> findAllTagsDistinct() {
        return reactiveMongoTemplate.findDistinct("tags", Task.class, String.class);
    }

    @Override
    public Flux<Task> findAllByGroup(String group) {
        return taskRepository.findAllByGroup(group);
    }
}
