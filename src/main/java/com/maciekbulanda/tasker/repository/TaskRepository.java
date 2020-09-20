package com.maciekbulanda.tasker.repository;

import com.maciekbulanda.tasker.documents.Task;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface TaskRepository extends ReactiveMongoRepository<Task, String> {
}