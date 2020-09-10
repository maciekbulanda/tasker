import React, {Fragment, useState} from "react";
import classes from "./NewTask.module.css";
import "../../fontello/css/fontello-embedded.css"


const NewTask = (props) => {
    let [expanded, setExpanded] = useState(false);

    let content = null;
    if (expanded) {
        content = (
            <form style={{display: "flex"}} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <textarea rows={4} className={classes.inputArea} placeholder="Zadanie"/>
                <button className={classes.button}><i className="demo-icon icon-plus" style={{fontSize: "2em"}}></i></button>
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

export default NewTask;