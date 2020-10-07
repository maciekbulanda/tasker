import React, {Fragment, useEffect} from "react";
import axios from "axios";
import classes from "./TaskList.module.css";
import NewTask from "../NewTask/NewTask";
import {baseUrl} from "../../common/utils";
import {connect} from "react-redux";
import * as actions from "../../Store/actions";
import Task from "../Task/Task";

const TaskList = (props) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    useEffect(() => {
        connection.get("/api/tasks").then((response) => {
            props.addTasks(response.data);
        })// eslint-disable-next-line
    },[])

    let tasklist;

    if (props.tasks.length > 0) {
        tasklist = props.tasks.map((item, index) => <Task key={index}>{item}</Task>);
    } else {
        tasklist = "Task list is empty";
    }

    return (
        <Fragment>
            <div className={classes.taskList}>
                <NewTask/>
                {tasklist}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        login: state.login,
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks : (tasks) => dispatch(actions.addTasksToStore(tasks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);