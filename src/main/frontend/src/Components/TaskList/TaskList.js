import React, {Fragment} from "react";
import classes from "./TaskList.module.css";
import NewTask from "../NewTask/NewTask";

const TaskList = (props) => {
    return (
        <Fragment>
            <div className={classes.taskList}>TaskList</div>
            <NewTask/>
        </Fragment>
    )
}

export default TaskList;