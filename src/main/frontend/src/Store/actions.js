import myAxios from "../common/utils";

export const USER_LOGIN = "USER_LOGIN";
export const START_LOGIN = "START_LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";

export const startLogin = () => dispatch => {
    console.log("startLogin");
    myAxios.get("/login").then(response => {
        return dispatch(userLogin());
    }).catch(err => dispatch(failedLogin()));
}

const userLogin = (login, token, expires) => {
    console.log("userLogin");
    return {type: USER_LOGIN, login: login, token: token, expires: expires};
}

const failedLogin = () => {
    console.log("Error login");
    return {type: FAILED_LOGIN};
}