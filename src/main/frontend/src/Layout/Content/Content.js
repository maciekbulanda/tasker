import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import LoginForm from "../../Components/LoginForm/LoginForm";
import classes from "./Content.module.css"
import {connect} from "react-redux";

const Content = (props) => {

    return (
        <div className={classes.content}>
            <Sidebar/>
            <LoginForm/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}


export default connect(mapStateToProps)(Content);