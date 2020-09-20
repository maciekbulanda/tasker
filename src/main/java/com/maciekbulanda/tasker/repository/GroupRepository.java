package com.maciekbulanda.tasker.repository;

import com.maciekbulanda.tasker.documents.Group;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface GroupRepository extends ReactiveMongoRepository<Group, String> {
}
