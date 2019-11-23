// Actions
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODOS_BULK = 'ADD_TODOS_BULK'
export const REMOVE_TODO = 'REMOVE_TODO'


const addTodo = (text) => dispatch => {
    console.log(text, dispatch)
    dispatch({
        type: ADD_TODO,
        payload: text
    })
}
export default addTodo