import {ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_DONE, ADD_TODOS_BULK} from '../actions/todos'

// let generatedId = 0
const initialState = [] //{todos : [{'title': 'test t', 'author': 'test a', 'done': ''}]}

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            const newState = [
                ...state,
                ...action.payload,
            ];
            return newState;
        }
        case REMOVE_TODO: {
            const index = state.findIndex(({id}) => id === action.payload)
            const newState = state.slice()
            newState.splice(index, 1)
            return newState
        }
        case EDIT_TODO: {
            const newState = state.slice()
            const { index, title } = action.payload
            newState[index].title = title
            return newState
        }
        case TOGGLE_DONE: {
            const newState = state.slice()
            const index = action.payload
            newState[index].done = !newState[index].done
            return newState
        }
        case ADD_TODOS_BULK: {
            alert('ADD BULK to state')
            return [...state, action.payload]
        }
        default:
            return state
    }
}
