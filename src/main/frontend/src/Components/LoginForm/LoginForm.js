import React, {useState} from "react";
import {connect} from "react-redux";
import classes from "./LoginForm.module.css";
import * as actions from "../../Store/actions"

const LoginForm = (props) => {
    let [user, setUser] = useState("");
    let [pass, setPass] = useState("");

    const onUserChange = (event) => {
        console.log(props.login)
        setUser(event.target.value);
    }
    const onPassChange = (event) => {
        setPass(event.target.value);
    }

    return (
        <div className={classes.loginForm}>
            {props.login.loginError? <div className={classes.error}>Błąd logowania</div>: null}
            <input onChange={onUserChange} className={classes.user} type={"text"} placeholder={"użytkownik"} value={user}/>
            <input onChange={onPassChange} className={classes.pass} type={"password"} placeholder={"hasło"} value={pass}/>
            <button onClick={props.onSubmit}>Wyślij</button>
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
        onSubmit: () => dispatch(actions.startLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);