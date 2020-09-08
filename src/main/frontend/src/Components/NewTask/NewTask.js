import React, {Fragment, useState} from "react";
import classes from "./NewTask.module.css";


const NewTask = (props) => {
    let [expanded, setExpanded] = useState(false);

    let content = null;
    if (expanded) {
        content = (
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <textarea className={classes.inputArea} placeholder="Zadanie"/>
            </form>
        );
    } else {
        content = (
            <button className={classes.button} onClick={() => {
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

export default NewTask;