import {myAxios as axios} from "../common/utils";
import jwtDecode from "jwt-decode";

export const USER_LOGIN = "USER_LOGIN";
export const START_LOGIN = "START_LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const TOGGLE_FILTER_TAGS = "TOGGLE_FILTER_TAGS";
export const ADD_TASKS_TO_STORE = "ADD_TASKS_TO_STORE";
export const REMOVE_TASK = "REMOVE_TASK";
export const ADD_TASK = "ADD_TASK";

export const startLogin = (username, password, history) => dispatch => {
    axios.get("/login", {auth: {username: username, password: password}})
        .then(response => {
            history.push("/");
            let token = response.headers.authorization.slice(7);
            let decoded = jwtDecode(token);
            return dispatch(userLogin(username, token, decoded.exp));
        })
        .catch(err => dispatch(failedLogin()));
}

const userLogin = (login, token, expires) => {
    return {type: USER_LOGIN, login: login, token: token, expires: expires};
}

const failedLogin = () => {
    return {type: FAILED_LOGIN};
}

export const userLogout = () => {
    return {type: USER_LOGOUT};
}

export const toggleFilterTags = (tagName) => {
    return {type: TOGGLE_FILTER_TAGS, name: tagName};
}

export const addTasksToStore = tasks => {
    return {type: ADD_TASKS_TO_STORE, tasks: tasks};
}

export const removeTask = id => {
    return {type: REMOVE_TASK, id: id};
}

export const addTask = task => {
    return {type: ADD_TASK, task: task};
}