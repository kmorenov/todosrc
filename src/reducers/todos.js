import { ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_DONE, ADD_TODOS_BULK, SET_SHOW_SPINNER } from '../actions/todos'

import api from '../api/api'

const initialState = [] //() => {
//     return api.getTodos()
//         .then(todos => {
//             console.log('inside reducer then: ', initialState = todos)
//              return initialState = todos
//         })   //[{'title': 'test t', 'author': 'test a', 'done': ''}]
// }

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
            const {index, title} = action.payload
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
            return [...state, action.payload]
        }
        case SET_SHOW_SPINNER: {
            return [...state, action.payload]
        }
        default:
            return state
    }
}
