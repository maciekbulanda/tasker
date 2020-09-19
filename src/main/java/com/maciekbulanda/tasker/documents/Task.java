package com.maciekbulanda.tasker.documents;

import com.maciekbulanda.tasker.types.Priority;
import com.maciekbulanda.tasker.types.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    private String id;
    private String content;
    private String owner;
    private String assignedPerson;
    private String group;
    private Set<String> tags;
    private Priority priority;
    private Status status;

    public Task withOwner(String username) {
        return new Task(this.id, this.content, username, this.assignedPerson, this.group, this.tags, this.priority, this.status);
    }
}
