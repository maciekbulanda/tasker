import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import LoginForm from "../../Components/LoginForm/LoginForm";
import classes from "./Content.module.css"

const Content = () => {
    return (
        <div className={classes.content}>
            <Sidebar/>
            <LoginForm/>
        </div>
    );
}

export default Content;