import React from "react";
import HomePage from "../HomePage/HomePage"
import UserPage from "../UserPage/UserPage";
import LoginForm from "../../Components/LoginForm/LoginForm";
import classes from "./Content.module.css"
import {connect} from "react-redux";
import {Switch, Route, Link} from "react-router-dom";

const Content = (props) => {
    let homePage = (<HomePage/>);
    let userPage = (<UserPage/>);
    if (!props.login.userLoggedIn) {
        homePage = (
            <span style={{fontSize : "1.5em"}}>Please <Link className={"normal"} to={"/login"}>log in</Link></span>
        )
        userPage = homePage;
    }
    return (
        <div className={classes.content}>
            <Switch>
                <Route path={"/login"}><LoginForm/></Route>
                <Route path={"/user"}>{userPage}</Route>
                <Route path={"/"}>{homePage}</Route>
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