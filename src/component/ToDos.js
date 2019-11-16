import React, {useCallback, useEffect, useState} from 'react'
import ToDo from "./ToDo";
// import getTodos from '../api/api'
import URL_POSTS from '../api/constants'

// import axios from 'axios';

const ToDos = () => {
    const [todos, setTodos] = useState([])
    const formRef = React.useRef(null);

    const getTodos = useCallback(() => {
        return fetch(URL_POSTS)
            .then((response) => response.json())
            .then((response) => {
                setTodos(response)
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
            .then(res => console.log(res, 'qqq1111')||setTodos([...todos, res]))
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

    return (
        <div>
            <form ref={formRef} onSubmit={onSubmit}>
                Title: <input type="text" name="title"/>
                Author: <input type="text" name="author"/>
                Done: <input type="checkbox" name="done" value="Done"/>
                <button type="submit"> Add ToDo</button>
            </form>
            <table>
                <tr>
                    {todos.map((todo, index) => (
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
                    ))}
                </tr>
            </table>
        </div>
    )
}
export default ToDos