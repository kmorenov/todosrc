// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Api
import Api from '../api/api';
import { editTodo, removeTodo, toggleDone } from '../actions/todos';

class ToDo extends Component {
    onDelete = (event, id) => {
        event.preventDefault();
        const res = window.confirm(`Permanently delete id: ${id} from backend?`);

        if (res) {
            Api.deleteTodo(id);
        }
    };

    onUpdate = (event) => {
        event.preventDefault();
        const { id, value, done } = this.props;
        const res = window.confirm(`Update id: ${id}?`);

        if (res) {
            const data = {
                author: 'km',
                done: done,
                title: value,
            };
            Api.updateTodo(id, data)
              .then(this.editTodo);
        }
    };

    onCheckboxChange = (event, id, checked, value) => {
        const change = checked === 'Done' ? '' : 'Done';
        const data = {
            author: 'km',
            done: change,
            title: value,
        };
        Api.updateTodo(id, data)
          .then(this.editTodo);
    };

    onChange = (ev) => {
        const { editTodo, id, index } = this.props;
        const { value } = ev.target;
        editTodo(id, { index, title: value });
    };

    editTodo = (data) => {
        const { editTodo } = this.props;
        editTodo(data);
    };

    render() {
        const {
            author, done, name, id, value,
        } = this.props;

        return (
          <div id="wrapper" className="container">
            <form>
                <div className="row">
                    <span className="col-1">{id}</span>
                    <span className="col-4 row">
                        <input
                            type="text"
                            key={id}
                            value={value}
                            name={name}
                            onChange={this.onChange}
                        />
                    </span>
                    <span className="col-2">{author}</span>
                    <span className="col-2">
                        <input
                            type="checkbox"
                            name="done"
                            checked={done ? 1 : ''}
                            onChange={(event) => {
                                this.props.toggleDone(this.props.index);
                                this.onCheckboxChange(event, this.props.id, this.props.done, this.props.value)
                            }}
                        />
                    </span>
                    <button onClick={this.onUpdate}>
                        Save
                    </button>
                    <button
                      onClick={(event) => {
                        this.props.removeTodo(id);
                        this.onDelete(event, id);
                      }}
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
