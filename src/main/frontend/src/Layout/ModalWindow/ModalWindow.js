import React from "react";
import classes from "./ModalWindow.module.css"

const ModalWindow = (props) => {
    return (
        <div className={classes.frame} onClick={(event) => {event.stopPropagation()}}>
            <div className={classes.window}>
                <div>{props.content}</div>
                <div className={classes.buttons_row}>
                    <button onClick={props.onConfirm}>OK</button>
                    <button onClick={props.onCancel}>Zamknij</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;