import React, {useCallback, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ToDo from "./ToDo";
// import getTodos from '../api/api'
import URL_POSTS from '../api/constants'


// import axios from 'axios';

import TextToDo from './TextToDo'

import addTodo from '../actions/todos'


const ToDos = (props) => {
    console.log(props);
    const [editedToDo, setEditedToDo] = useState(-1)
    const [todos, setTodos] = useState([])

    const formRef = React.useRef(null);


    // const titleRef = React.useRef()

    const getTodos = useCallback(() => {
        return fetch(URL_POSTS)
            .then((response) => response.json())
            .then((response) => {
                props.addTodo(response ) //{'title': 'test t', 'author': 'test a', 'done': 'test done'}) //
                // setTodos(response)
            })
    }, []);

    useEffect(() => {
        getTodos()
    }, [getTodos])

    const onChange = (event, index) => {
        const copy = [...todos];   //todos.slice() is working also
        copy[index].title = event.target.value
        setTodos(copy)
    }

    const toggleDone = (event, index) => {
        alert('toggle Done')
        const copy = [...todos];   //todos.slice() is working also
        copy[index].done = !copy[index].done
        setTodos(copy)
    }

    const updateDeletedState = (index) => {
        const res = window.confirm(`Delete row ${index + 1}?`)
        if (res) {
            const copy = todos.slice()
            copy.splice(index, 1)
            setTodos(copy)
        }
    }

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
            // .then(res => setTodos([...todos, res]))
            .catch(err => alert(err))
        /*       axios to check later
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/posts/',
                    data: {
                        ...data, 'title': data.get('title'), 'author': data.get('author'), 'done': data.get('done')}
                    })
                    .then(res => res.json())
                    .then(res => setTodos(res))*/
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
            {console.log('props BEFORE map:', props)}
            {props.todos && props.todos.map((todo, index) =>
                    index == editedToDo ?
                        <ToDo
                            id={todo.id}
                            name={todo.title}
                            index={index}
                            value={todo.title}
                            onChange={onChange}
                            author={todo.author}
                            done={todo.done}
                            onCheckChange={toggleDone}
                            updateDeletedState={updateDeletedState}
                        />
                        :
                        <span onClick={() => setEdited(index)}>
                            <TextToDo
                                si
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
    console.log('mapStateToprops: ', state.todos)
    // [todos] = state
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = ({
    addTodo
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDos)
// export default ToDos