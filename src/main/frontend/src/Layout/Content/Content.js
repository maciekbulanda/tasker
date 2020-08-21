import React from "react";
import HomePage from "../HomePage/HomePage"
import LoginForm from "../../Components/LoginForm/LoginForm";
import classes from "./Content.module.css"
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";

const Content = (props) => {

    return (
        <div className={classes.content}>
            <Switch>
                <Route path={"/login"}><LoginForm/></Route>
                <Route path={"/"}><HomePage username={props.login.userLoggedIn}/></Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}


export default connect(mapStateToProps)(Content);