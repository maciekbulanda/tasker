import React, {useState} from "react";
import classes from "./Task.module.css"
import {baseUrl} from "../../common/utils"
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../Store/actions";

const Task = (props) => {
    let [menuVisible, setMenuVisible] = useState(false);
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    const deleteTask = (event, id) => {
        connection.delete("/api/tasks/"+ id)
            .then((response) => {
                props.removeTask(id);
            });
    }

    let menu = (<div className={classes.menu}>
        <button onClick={(event) => {deleteTask(event, props.children.id)}} className={classes.menuitem}>Usuń</button>
    </div>);

    return (
        <div onClick={toggleMenu} className={classes.task}>
            <div className={classes.group}>{props.children.group}</div>
            <div className={classes.content}>{props.children.content}</div>
            <div className={classes.owner}>{props.children.owner}</div>
            <div className={classes.assignedPerson}>{props.children.assignedPerson}</div>
            <div className={classes.tags}>{props.children.tags}</div>
            <div className={classes.priority}>{props.children.priority}</div>
            <div className={classes.status}>{props.children.status}</div>
            {menuVisible? menu : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        filterState: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeTask : id => dispatch(actions.removeTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);