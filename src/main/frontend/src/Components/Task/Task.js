import React from "react";

const Task = (props) => {
    return (
        <div style={{margin : "10px 0"}}>
            <div>{props.children.content}</div>
            <div>{props.children.owner}</div>
            <div>{props.children.assignedPerson}</div>
            <div>{props.children.group}</div>
            <div>{props.children.tags}</div>
            <div>{props.children.priority}</div>
            <div>{props.children.status}</div>
        </div>
    )
}

export default Task;