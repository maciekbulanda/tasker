import * as actions from "./actions"

const initState = [];

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_TASKS_TO_STORE: {
            return action.tasks;
        }
        default: { return state;}
    }
}