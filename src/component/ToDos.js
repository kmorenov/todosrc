// Core
import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
// Components
import ToDo from './ToDo';
import TextToDo from './TextToDo'
// Api
import Api from '../api/api';
// Actions
import { addTodo } from '../actions/todos'


const ToDos = (props) => {
    const { addTodo, todos } = props;
    const [editedToDo, setEditedToDo] = useState(-1);
    const formRef = useRef(null);

    const getTodos = useCallback(() => {
        Api.getTodos().then(addTodo);
    }, [addTodo]);

    useEffect(() => {
        getTodos()
    }, [getTodos]);


    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {
            title: formData.get('title'),
            author: formData.get('author'),
            done: formData.get('done'),
        };

        Api.addTodo(data)
            .then(res => props.addTodo([res]))
    };

    const setEdited = (index) => {
        setEditedToDo(index)
    };

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

            {todos.map((todo, index) =>
                index === editedToDo ? (
                    <ToDo
                        key={todo.id}
                        id={todo.id}
                        name={todo.title}
                        index={index}
                        value={todo.title}
                        author={todo.author}
                        done={todo.done}
                    />
                ) : (
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
            )
            }
        </div>

    )
};

ToDos.propTypes = {
    todos: PropTypes.arrayOf(),
};

ToDos.defaultProps = {
    todos: [],
};

const mapStateToProps = (state) => ({
    todos: state,
});

const mapDispatchToProps = dispatch => ({
    addTodo: todos => dispatch(addTodo(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDos)
