import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import classes from "./NewTask.module.css";
import "../../fontello/css/fontello-embedded.css"
import axios from "axios";
import * as actions from "../../Store/actions";
import {baseUrl} from "../../common/utils";

const addTask = (token, text, addTaskFun) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    let tags = separateTags(text);

    if (text.length > 0) {
        let taskJson = {
            content: text,
            tags: tags
        }
        connection.post("/api/tasks", taskJson).then((response) => {
            addTaskFun(response.data);
            console.log(response.data);
        });
    }
}

const separateTags = (/*String*/ inputText) => {
    const pattern = /#(\S+)/g;
    const tags = inputText.match(new RegExp(pattern));
    return tags.map(el => el.slice(1));
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
                    onClick={() => {
                        addTask(props.login.token, text, (task) => {props.addTaskToStore(task)})
                    }} className={classes.button} style={{marginLeft: "5px"}}>
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
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTaskToStore: task => dispatch(actions.addTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);