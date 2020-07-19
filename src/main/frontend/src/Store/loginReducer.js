import * as actions from "./actions";

const initState = {
    userLoggedIn: null,
    token: "",
    loginExpires: null
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.USER_LOGIN :
            return {
                userLoggedIn: action.login,
                token: action.token,
                loginExpires: action.expires
            };
        default:
            return state;
    }
};