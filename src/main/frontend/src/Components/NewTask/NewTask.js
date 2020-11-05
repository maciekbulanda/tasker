import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import classes from "./NewTask.module.css";
import "../../fontello/css/fontello-embedded.css"
import axios from "axios";
import * as actions from "../../Store/actions";
import {baseUrl} from "../../common/utils";

const addTask = (connection, text, group, addTaskFun) => {
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

    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    const addButtonHandler = () => {
        addTask(connection, text, group, (task) => {props.addTaskToStore(task)});
        setText("");
        setGroup("");
        setExpanded(false);
    }

    let [expanded, setExpanded] = useState(false);
    let [text, setText] = useState("");
    let [group, setGroup] = useState("");
    let [groupList, setGroupList] = useState([]);

    useEffect(() => {
        connection.get("api/groups").then(resp => {
            setGroupList(resp.data);
        }) // eslint-disable-next-line
    },[])


    let content;
    if (expanded) {
        content = (
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <textarea onChange={(e) => {
                    setText(e.target.value);
                }} rows={4} className={[classes.inputArea, classes.fullWidth].join(" ")} placeholder="Zadanie" value={text}/>
                <input className={classes.inputText} list={"groups"} placeholder={"Grupa"} onChange={(e) => {
                    setGroup(e.target.value);
                }
                }/>
                <datalist id={"groups"} className={classes.datalist}>
                    {groupList.map(group => (<option key={group.id} value={group.id}>{group.name}</option>))}
                </datalist>
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