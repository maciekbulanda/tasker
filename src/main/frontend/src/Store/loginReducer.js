import * as actions from "./actions";

const initState = {
    userLoggedIn: null,
    token: "",
    userExpires: null
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.USER_LOGIN :
            return state;
        default:
            return state;
    }
};