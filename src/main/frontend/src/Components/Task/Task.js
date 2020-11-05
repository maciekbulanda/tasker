import React, {useState} from "react";
import classes from "./Task.module.css"
import {baseUrl} from "../../common/utils"
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../Store/actions";
import ModalWindow from "../../Layout/ModalWindow/ModalWindow";
import {edit, trash} from "../../common/icons";

const Task = (props) => {
    let [menuVisible, setMenuVisible] = useState(false);
    let [displayModal, setDisplayModal] = useState(false);
    let [menuclass, setMenuclass] = useState(classes.menuoff);
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    const toggleMenu = (on) => {
        if (!on) {
            setTimeout(() => setMenuVisible(false), 100);
            setMenuclass(classes.menuoff);
        } else {
            setMenuVisible(true);
            setTimeout(() => setMenuclass(classes.menuon), 10);
        }
    }

    const deleteTask = (event, id) => {
        connection.delete("/api/tasks/" + id)
            .then(() => {
                props.removeTask(id);
            });
    }

    let menu = (<div className={[classes.menu, menuclass].join(" ")}>
        <div onClick={(event) => {
            deleteTask(event, props.children.id)
        }} className={classes.menuitem}>
            {trash({size: 20, color: "#000000"})}
        </div>
        <div onClick={(event) => {
            setDisplayModal(true);
            event.stopPropagation();
        }} className={classes.menuitem}>
            {edit({size: 20, color: "#000000"})}
        </div>
    </div>);

    let addDate = new Date(props.children.addDate);

    return (
        <div onMouseEnter={() => toggleMenu(true)}
             onMouseLeave={() => toggleMenu(false)} className={classes.task}>
            <div className={classes.date}>{addDate.toLocaleDateString()} {addDate.toLocaleTimeString()}</div>
            <div className={classes.group}>{props.children.group}</div>
            <div className={classes.content}>{props.children.content}</div>
            <div className={classes.owner}>{props.children.owner}</div>
            <div className={classes.assignedPerson}>{props.children.assignedPerson}</div>
            <div className={classes.tags}>{props.children.tags.join(" ")}</div>
            <div className={classes.priority}>{props.children.priority}</div>
            <div className={classes.status}>{props.children.status}</div>
            {displayModal ? <ModalWindow content={"test"} onCancel={() => setDisplayModal(false)}/> : null}
            {menuVisible ? menu : null}
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
        removeTask: id => dispatch(actions.removeTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);