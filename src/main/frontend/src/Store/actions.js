import axios from "../common/utils";
import jwtDecode from "jwt-decode";

export const USER_LOGIN = "USER_LOGIN";
export const START_LOGIN = "START_LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const startLogin = (username, password) => dispatch => {
    axios.get("/login", {auth: {username: username, password: password}}).then(response => {
        let token = response.headers.authorization.slice(7);
        let decoded = jwtDecode(token);
        return dispatch(userLogin(username, token, decoded.exp));
    }).catch(err => dispatch(failedLogin()));
    console.log("startLogin");
}

const userLogin = (login, token, expires) => {
    return {type: USER_LOGIN, login: login, token: token, expires: expires};
}

const failedLogin = () => {
    console.log("Error login");
    return {type: FAILED_LOGIN};
}

export const userLogout = () => {
    return {type: USER_LOGOUT};
}