import React, {useEffect, useState} from 'react'
import ToDo from "./ToDo";
// import getTodos from '../api/api'
import URL_POSTS from '../api/constants'

const ToDos = (() => {
    const [todos, setTodos] = useState([])

    const getTodos = () => {
        return fetch(URL_POSTS)
            .then((response) => response.json())
            .then((response) => {
                // this.setState({photos: response})
                setTodos(response, () => console.log('TDS: ', todos))
            })
    }

    useEffect(() => {
        getTodos()
    }, [])

    const onChange = (event, index) => {
        // const todos = todos.slice()
        const copy = [...todos];   //todos.slice() is working also
        copy[index].title = event.target.value
        setTodos(copy)
    }

    return (
        <div>
            <form action={URL_POSTS} method="POST" encType="application/json">
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
                        />
                    ))}
                </tr>
            </table>
        </div>
    )
})
export default ToDos