import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import classes from "./LoginForm.module.css";
import * as actions from "../../Store/actions"

const LoginForm = (props) => {
    let [user, setUser] = useState("");
    let [pass, setPass] = useState("");

    const onUserChange = (event) => {
        setUser(event.target.value);
    }
    const onPassChange = (event) => {
        setPass(event.target.value);
    }

    let loginControls = (
        <Fragment>
            {props.login.loginError ? <div className={classes.error}>Błąd logowania</div> : null}
            <input onChange={onUserChange} className={classes.user} type={"text"} placeholder={"użytkownik"} value={user}/>
            <input onChange={onPassChange} className={classes.pass} type={"password"} placeholder={"hasło"} value={pass}/>
            <button onClick={() => {props.onSubmit(user, pass)}}>Wyślij</button>
        </Fragment>
    )

    if (props.login.userLoggedIn !== "")
        loginControls = (
            <button onClick={props.onLogout}>Logout</button>
        )

    return (
        <div className={classes.loginForm}>
            {loginControls}
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
        onSubmit: (user, pass) => dispatch(actions.startLogin(user, pass)),
        onLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);