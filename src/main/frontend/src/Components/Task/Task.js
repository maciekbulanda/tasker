import React from "react";
import classes from "./Task.module.css"

const Task = (props) => {
    return (
        <div className={classes.task}>
            <div className={classes.group}>{props.children.group}</div>
            <div className={classes.content}>{props.children.content}</div>
            <div className={classes.owner}>{props.children.owner}</div>
            <div className={classes.assignedPerson}>{props.children.assignedPerson}</div>
            <div className={classes.tags}>{props.children.tags}</div>
            <div className={classes.priority}>{props.children.priority}</div>
            <div className={classes.status}>{props.children.status}</div>
        </div>
    )
}

export default Task;