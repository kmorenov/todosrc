// Core
import React, {
    useCallback, useEffect, useRef, useState, useReducer
} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
// Components
import ToDo from './ToDo';
import TextToDo from './TextToDo'
// Api
import Api from '../api/api';
// Actions
import { addTodoAction, getTodosFromServer, showSpinnerAction } from '../actions/todos'

const initialState = {
    author: '',
    done: false,
    title: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'afterSubmit':
            return initialState;
        case 'setTitle':
            return {
                ...state,
                title: action.payload.title,
            };
        case 'setAuthor':
            return {
                ...state,
                author: action.payload.author,
            }
        case 'setDone':
            return {
                ...state,
                done: !state.done,
            }
        default:
            throw new Error("Я что-то делаю не так!")
    }
}

const ToDoList = (props) => {
    const { addTodoBtn, todos, getTodosFromServer, showSpinner } = props;
    const [ editedToDo, setEditedToDo ] = useState(-1);
    const formRef = useRef(null);

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const getTodos = useCallback(() => {
        Api.getTodos().then(addTodoBtn);
    }, [addTodoBtn]);

    useEffect(() => {
        getTodos() //loadBackend() 16/12/19
    }, [getTodos]);

    /*    useEffect(() => {
            // Logic
            // Did mount === Did update
            return () => {
                // Unmount
            };
        }, []);*/


    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {
            title: formData.get('title'),
            author: formData.get('author'),
            done: formData.get('done'),
        };

        Api.addTodoButtton(data)
            .then(res => addTodoBtn([res]))
            .then(dispatch({type: 'afterSubmit'}))

    };

    const setEdited = (id) => setEditedToDo(id)

    const onTitleChange = (event) => {
        dispatch({type: 'setTitle', payload: event.target.value})
    }
    const onAuthorChange = (event) => {
        dispatch({type: 'setAuthor', payload: event.target.value})
    }
    const onDoneChange = () => {
        dispatch({type: 'setDone'})
    }

    const onGetDataFromServer = (event) => {
        event.preventDefault();
        getTodosFromServer()
    }

    return (
        <div>
            <form ref={formRef} onSubmit={onSubmit}>
                <span className="col-1">Title: <input type="text" name="title" value={state.title}
                                                      onChange={onTitleChange}/></span>
                <span className="col-5">Author: <input type="text" name="author" value={state.author}
                                                       onChange={onAuthorChange}/></span>
                <span className="col-6">Done: <input type="checkbox" name="done" checked={state.done}
                                                     onChange={onDoneChange}/></span>
                <button type="submit"> Add ToDo</button>
                <button onClick={(event) => onGetDataFromServer(event)}> Add ToDo from Server</button>
                <button onClick={() => showSpinner('')}> Add Saga Todos</button>
            </form>
            <div className="row">
                <span className="col-1">ID</span>
                <span className="col-1">Title</span>
                <span className="col-4">Author</span>
                <span className="col-2 text-left">Done</span>
            </div>
            {todos && todos.map((todo, index) =>
                todo.id === editedToDo ? (
                    <ToDo key={todo.id} todo={todo} index={index}/>
                ) : (
                    <span key={todo.id} onClick={() => setEdited(todo.id)}>
                        <TextToDo {...todo}/>
                    </span>
                )
            )
            }
        </div>)
};

ToDoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            author: PropTypes.string,
            done: PropTypes.bool,
            title: PropTypes.string,
            id: PropTypes.number,
        }),
    ),
};

ToDoList.defaultProps = {
    todos: [],
};

const mapStateToProps = (state) => ({
    todos: state,
});

const mapDispatchToProps = dispatch => ({
    addTodoBtn: todos => dispatch(addTodoAction(todos)),
    getTodosFromServer: todos => dispatch(getTodosFromServer(todos)),
    showSpinner: text => dispatch(showSpinnerAction(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)
