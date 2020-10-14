package com.maciekbulanda.tasker.converter;

import com.maciekbulanda.tasker.documents.Task;
import com.maciekbulanda.tasker.types.Priority;
import com.maciekbulanda.tasker.types.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class ApiTask {
    private String id;
    private LocalDateTime addDate;
    private LocalDateTime dueDate;
    private String content;
    private String owner;
    private String assignedPerson;
    private String group;
    private Set<String> tags;
    private Priority priority;
    private Status status;
    public ApiTask(Task task) {
        this.id = task.getId();
        this.addDate = task.getAddDate();
        this.dueDate = task.getDueDate();
        this.content = task.getContent();
        this.assignedPerson = task.getAssignedPerson();
        this.owner = task.getOwner();
        this.group = task.getGroup();
        this.tags = task.getTags();
        this.priority = task.getPriority();
        this.status = task.getStatus();
    }
}
