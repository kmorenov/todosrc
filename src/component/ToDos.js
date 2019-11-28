import React, {useCallback, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ToDo from "./ToDo";
// import getTodos from '../api/api'
import URL_POSTS from '../api/constants'

import TextToDo from './TextToDo'

import { addTodo } from '../actions/todos'


const ToDos = (props) => {
    const { addTodo, removeTodo } = props;
    const [editedToDo, setEditedToDo] = useState(-1)
    const [todos, setTodos] = useState([])

    const formRef = React.useRef(null);

    const getTodos = useCallback(() => {
        return fetch(URL_POSTS)
            .then((response) => response.json())
            .then((response) => {
                addTodo(response)
            })
    }, [addTodo]);

    useEffect(() => {
        getTodos()
    }, [getTodos])


    const onSubmit = (event) => {
        event.preventDefault()
        // console.dir(event.target, 'qqqqq');
        const data = new FormData(event.target);
        fetch(URL_POSTS, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify({'title': data.get('title'), 'author': data.get('author'), 'done': data.get('done')})
        })
            .then(res => res.json())
            .then(res => props.addTodo([res]))
            .catch(err => alert(err))
    }

    const setEdited = (index) => {
        setEditedToDo(index)
    }

    return (

        <div>
            <form ref={formRef} onSubmit={onSubmit}>
                <span className="col-1">Title: <input type="text" name="title"/></span>
                <span className="col-5">Author: <input type="text" name="author"/></span>
                <span className="col-6">Done: <input type="checkbox" name="done" value="Done"/></span>
                <button type="submit"> Add ToDo</button>
            </form>
            <div className="row">
                <span className="col-1">ID</span>
                <span className="col-1">Title</span>
                <span className="col-4">Author</span>
                <span className="col-2 text-left">Done </span>
            </div>

            {props.todos && props.todos.map((todo, index) =>
                index == editedToDo ?
                    <ToDo
                        key={index}
                        id={todo.id}
                        name={todo.title}
                        index={index}
                        value={todo.title}
                        author={todo.author}
                        done={todo.done}
                    />
                    :
                    <span key={index} onClick={() => setEdited(index)}>
                            <TextToDo
                                id={todo.id}
                                name={todo.title}
                                index={index}
                                value={todo.title}
                                author={todo.author}
                                done={todo.done}
                            />
                        </span>
            )
            }
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTodo: todos => dispatch(addTodo(todos)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDos)
