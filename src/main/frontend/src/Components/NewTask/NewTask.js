import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import classes from "./NewTask.module.css";
import "../../fontello/css/fontello-embedded.css"
import axios from "axios";
import {baseUrl} from "../../common/utils";

const addTask = (token, text) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    let taskJson = {
        content: text
    }

    connection.post("/api/tasks", taskJson);

}
const NewTask = (props) => {
    let [expanded, setExpanded] = useState(false);
    let [text, setText] = useState("");

    let content = null;
    if (expanded) {
        content = (
            <form style={{display: "flex"}} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <textarea onChange={(e) => {
                    setText(e.target.value);
                }} rows={4} className={classes.inputArea} placeholder="Zadanie"/>
                <button
                    onClick={() => {addTask(props.login.token, text)}} className={classes.button} style={{marginLeft: "5px"}}>
                    <i className="demo-icon icon-plus" style={{fontSize: "2em"}}/>
                </button>
            </form>
        );
    } else {
        content = (
            <button className={[classes.button, classes.fullWidth].join(" ")} onClick={() => {
                setExpanded(!expanded);
            }}>Nowy</button>
        )
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        login : state.login
    }
}

export default connect(mapStateToProps)(NewTask);