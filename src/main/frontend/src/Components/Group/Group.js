import React from "react";
import classes from "./Group.module.css"

const Group = (props) => {
    return (
        <div>
            <div className={classes.id}>{props.children.id}</div>
            <div className={classes.name}>{props.children.name}</div>
            <div className={classes.admins}>{props.children.admins}</div>
            <div className={classes.users}>{props.children.users.join(", ")}</div>
            <div style={{float: "none", clear: "both"}}/>
        </div>
    )
}

export default Group;