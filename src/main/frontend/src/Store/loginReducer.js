import * as actions from "./actions";

const initState = {
    loginProcess: false,
    loginError: false,
    userLoggedIn: "",
    token: "",
    loginExpires: 0
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.START_LOGIN :
            return {
                ...state,
                loginProcess: true,
                loginError: false
            }
        case actions.USER_LOGIN :
            return {
                loginProcess: false,
                loginError: false,
                userLoggedIn: action.login,
                token: action.token,
                loginExpires: action.expires
            };
        case actions.FAILED_LOGIN:
            return {
                loginProcess: false,
                loginError: true,
                userLoggedIn: "",
                token: "",
                loginExpires: 0
            };
        default:
            return state;
    }
};