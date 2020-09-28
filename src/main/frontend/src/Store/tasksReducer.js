import * as actions from "./actions"

const initState = [];

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_TASKS_TO_STORE: {
            return action.tasks;
        }
        case actions.ADD_TASK: {
            return [...state, action.task];
        }
        case actions.REMOVE_TASK: {
            let /*Object[]*/ newState = [];
            for(let i = 0, j = 0; i<state.length; i++  ){
                if (state[i].id !== action.id) {
                    newState[j] = state[i];
                    j++;
                }
            }
            return newState;
        }
        default: { return state;}
    }
}