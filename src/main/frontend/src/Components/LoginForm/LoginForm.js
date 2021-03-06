import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import classes from "./LoginForm.module.css";
import * as actions from "../../Store/actions"

const LoginForm = (props) => {
    let [user, setUser] = useState("");
    let [pass, setPass] = useState("");
    let history = useHistory();

    const onUserChange = (event) => {
        setUser(event.target.value);
    }
    const onPassChange = (event) => {
        setPass(event.target.value);
    }

    let loginControls = (
        <form onSubmit={(event) => {
            props.onLogin(user, pass, history);
            event.preventDefault();
        }}>
            {props.login.loginError ? <div className={classes.error}>Błąd logowania</div> : null}
            <input onChange={onUserChange} className={classes.user} type={"text"} placeholder={"użytkownik"}
                   value={user}/>
            <input onChange={onPassChange} className={classes.pass} type={"password"} placeholder={"hasło"}
                   value={pass}/>
            <input className={classes.submit} type={"submit"} />
        </form>
    )

    if (props.login.userLoggedIn !== "") {
        let date = new Date(props.login.loginExpires*1000);
        loginControls = (
            <Fragment>
                <div className={classes.info}>Użytkownik {props.login.userLoggedIn} zalogowany do {date.toLocaleTimeString()} {date.toLocaleDateString()}</div>
                <button onClick={props.onLogout}>Logout</button>
            </Fragment>
        )
    }

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
        onLogin: (user, pass, history) => dispatch(actions.startLogin(user, pass, history)),
        onLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);