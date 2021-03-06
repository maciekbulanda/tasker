import React from "react";
import classes from "./Tag.module.css"

const Tag = (props) => {
    let classList = props.active? [classes.active] : [];
    classList = [...classList, classes.tag];
        return (
        <div onClick={props.onClick} className={classList.join(" ")}>{`${props.children._id}(${props.children.count})`}</div>
    )
}

export default Tag;