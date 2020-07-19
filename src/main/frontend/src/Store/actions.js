export const USER_LOGIN = "USER_LOGIN";
export const START_LOGIN = "START_LOGIN";

export const startLogin = () => dispatch => {
    console.log("startLogin");
    return dispatch(userLogin("maciek", "token", "2020-07-20"));
}

const userLogin = (login, token, expires) => {
    console.log("userLogin");
    return {type: USER_LOGIN, login: login, token: token, expires: expires}
}