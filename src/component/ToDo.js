// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Api
import Api from '../api/api';
import { editTodo, removeTodo, toggleDone } from '../actions/todos';


class ToDo extends Component {
    onDelete = () => {
        const { id } = this.props.todo
        const res = window.confirm(`Permanently delete id: ${id} from backend?`)

        if (res) {
            Api.deleteTodo(id)
                .then(this.props.removeTodo(id))
        }
    };

    onUpdate = () => {
        const { todo, index } = this.props
        const { id, title, done, author } = todo
        const res = window.confirm(`Update id: ${id}?`);

        if (res) {
            const data = {
                index,
                author,
                done,
                title
            };
            Api.updateTodo(id, data)
              .then(this.editTodo)
        }
    };

    onCheckboxChange = () => {
        const { todo, toggleDone, index } = this.props
        const { id, title, done, author } = todo
        const data = {
            index,
            author,
            done: !done,
            title
        };
        Api.updateTodo(id, data)
          .then(toggleDone(index))  //.then(dispatch(toggleDone(index))) dispatch can't be used outside MapDispatchToprops?
    };

    onChange = (ev) => {
        const { todo, editTodo, index } = this.props
        editTodo({ index, title: ev.target.value })
    };

    editTodo = (data) => {
        const { editTodo } = this.props;
        editTodo(data);
    };

    render() {
        const { todo } = this.props;

        return (
          <div id="wrapper" className="container">
            <form>
                <div className="row">
                    <span className="col-1">{todo.id}</span>
                    <span className="col-4 row">
                        <input
                            type="text"
                            key={todo.id}
                            value={todo.title}
                            name={todo.name}
                            onChange={this.onChange}
                        />
                    </span>
                    <span className="col-2">{todo.author}</span>
                    <span className="col-2">
                        <input
                            type="checkbox"
                            name="cbox"
                            checked={todo.done}
                            onChange={this.onCheckboxChange}
                        />
                    </span>
                    <button onClick={this.onUpdate}>
                        Save
                    </button>
                    <button
                      onClick={this.onDelete}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>)
    }
}

const mapStateToProps = state => ({
    todos: state,
});

const mapDispatchToProps = dispatch => ({
    editTodo: payload => dispatch(editTodo(payload)),
    removeTodo: id => dispatch(removeTodo(id)),
    toggleDone: index => dispatch(toggleDone(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
