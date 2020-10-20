import React, {useState} from "react";
import {connect} from "react-redux";
import classes from "./NewTask.module.css";
import "../../fontello/css/fontello-embedded.css"
import axios from "axios";
import * as actions from "../../Store/actions";
import {baseUrl} from "../../common/utils";

const addTask = (token, text, group, addTaskFun) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    let {tags, newText} = separateTags(text);

    if (newText.length > 0) {
        let taskJson = {
            content: newText,
            tags: tags,
            group: group
        }
        connection.post("/api/tasks", taskJson).then((response) => {
            addTaskFun(response.data);
        });
    }
}

const separateTags = (/*String*/ inputText) => {
    const pattern = /#(\S+)/g;
    const tags = inputText.match(new RegExp(pattern));
    return {tags: tags !== null ? tags.map(el => el.slice(1)) : [], newText: inputText.replace(pattern, "")};
}

const NewTask = (props) => {
    const addButtonHandler = () => {
        addTask(props.login.token, text, group, (task) => {props.addTaskToStore(task)});
        setText("");
        setGroup("");
        setExpanded(false);
    }
    let [expanded, setExpanded] = useState(false);
    let [text, setText] = useState("");
    let [group, setGroup] = useState("");

    let content;
    if (expanded) {
        content = (
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <textarea onChange={(e) => {
                    setText(e.target.value);
                }} rows={4} className={[classes.inputArea, classes.fullWidth].join(" ")} placeholder="Zadanie" value={text}/>
                <input className={classes.inputText} type={"text"} placeholder={"Grupa"} onChange={(e) => {
                    setGroup(e.target.value);
                }
                }/>
                <button
                    onClick={addButtonHandler} className={[classes.button, classes.fullWidth].join(" ")}>
                    Dodaj
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
        <div className={classes.newTask}>
            {content}
        </div>
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