// Actions
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const TOGGLE_DONE = 'TOGGLE_DONE'
export const ADD_TODOS_BULK = 'ADD_TODOS_BULK'


export const addTodo = (text) => dispatch => {
    console.log('ACTIONS: ', text, dispatch);
    dispatch({
        type: ADD_TODO,
        payload: text
    })
}

export const getTodosFromServer = (text) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
        .then(todos =>
    dispatch({
        type: ADD_TODOS_BULK,
        payload: todos
    }))
}


export const removeTodo = (id) => dispatch => {
    dispatch({
        type: REMOVE_TODO,
        payload: id
    })
}

export const editTodo = (payload) => dispatch => {
    console.log('dispatch: ', dispatch)
    dispatch({
        type: EDIT_TODO,
        payload: payload
    })
}

export const toggleDone = (index) => dispatch => {
    dispatch({
        type: TOGGLE_DONE,
        payload: index
    })
}
