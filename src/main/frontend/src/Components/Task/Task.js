import React, {useState} from "react";
import classes from "./Task.module.css"
import {baseUrl} from "../../common/utils"
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../Store/actions";
import ModalWindow from "../../Layout/ModalWindow/ModalWindow";

const Task = (props) => {
    let [menuVisible, setMenuVisible] = useState(false);
    let [displayModal, setDisplayModal] = useState(false);
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
            .then(() => {
                props.removeTask(id);
            });
    }

    let menu = (<div className={classes.menu}>
        <button onClick={(event) => {deleteTask(event, props.children.id)}} className={classes.menuitem}>Usuń</button>
        <button onClick={(event) => {
            setDisplayModal(true);
            event.stopPropagation();
        }}>Okienko</button>
    </div>);

    return (
        <div onClick={toggleMenu} className={classes.task}>
            <div className={classes.group}>{props.children.group}</div>
            <div className={classes.content}>{props.children.content}</div>
            <div className={classes.owner}>{props.children.owner}</div>
            <div className={classes.assignedPerson}>{props.children.assignedPerson}</div>
            <div className={classes.tags}>{props.children.tags.join(" ")}</div>
            <div className={classes.priority}>{props.children.priority}</div>
            <div className={classes.status}>{props.children.status}</div>
            {displayModal? <ModalWindow content={"test"} onCancel={() => setDisplayModal(false)}/> : null}
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