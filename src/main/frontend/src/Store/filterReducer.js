import * as actions from "./actions";

const initState = {
    tags: [],
    group: "",
    assigned: ""
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.TOGGLE_FILTER_TAGS:
            if (!state.tags.includes(action.name)) {
                return {
                    ...state,
                    tags: [...state.tags, action.name]
                }
            } else {
                let index = state.tags.indexOf(action.name);
                return {
                    ...state,
                    tags: state.tags.slice(0, index).concat(state.tags.slice(index +1))
                };
            }
        default:
            return state;
    }
}