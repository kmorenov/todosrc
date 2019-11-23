import {ADD_TODO, REMOVE_TODO, ADD_TODOS_BULK} from '../actions/todos'

// let generatedId = 0
const initState = [] //{todos : [{'title': 'test t', 'author': 'test a', 'done': ''}]}
export default function todoApp(state = initState, action) {
    console.log('FAKE STATE.todos: ', state.todos);
    switch (action.type) {
        case ADD_TODO:
            console.log(action.payload)
        {
            const newstate = {todos : action.payload} //[...state, {todos : action.payload}] //todos
            return newstate;
        }
        case ADD_TODOS_BULK: {
            return [...state, ...action.payload]
        }
        case REMOVE_TODO: {
            const index = state.findIndex(({id}) => id === action.payload)
            const newState = state.slice()
            newState.splice(index, 1)
            return newState
        }
        default:
            return state
    }
}
