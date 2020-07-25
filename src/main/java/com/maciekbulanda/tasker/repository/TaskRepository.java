package com.maciekbulanda.tasker.repository;

import com.maciekbulanda.tasker.documents.Task;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TaskRepository extends ReactiveMongoRepository<Task, String> {
}