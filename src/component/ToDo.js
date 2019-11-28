import React, {useState} from 'react'
import {connect} from "react-redux";
import URL_POSTS from '../api/constants'
import {editTodo, removeTodo, toggleDone} from "../actions/todos";

class ToDo extends React.Component {

    onDelete = (event, id) => {
        event.preventDefault()
        const res = window.confirm(`Permanently delete id: ${id} from backend?`)
        if (res) {
            fetch(URL_POSTS + `${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
        }
    }

    onUpdate = (event, {id, value, done}) => {
        event.preventDefault()
        const res = window.confirm(`Update id: ${id}?`)
        if (res) {
            fetch(URL_POSTS + `${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({"author": "km", "title": value, "done": done})
            })
                .then(res => res.json())
                .catch(err => alert(err))
        }
    }

    onCheckboxChange = (event, id, checked, value) => {
        let change = checked == 'Done' ? '' : 'Done'
        alert('Changes submitted to JSON server')
        fetch(URL_POSTS + `${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify({done: change, "author": "km", "title": value})
        })
            .then(res => res.json())
            .catch(err => alert(err))
    }

    render() {
        return (<div id="wrapper" className="container">
            <form>
                <div className="row">
                    <span className="col-1">{this.props.id}</span>
                    <span className="col-4 row">
                        <input
                            type="text"
                            key={this.props.id}
                            value={this.props.value}
                            name={this.props.name}
                            onChange={(ev) => this.props.editTodo({
                                title: ev.target.value,
                                index: this.props.index,
                            })}
                        />
                    </span>
                    <span className="col-2">{this.props.author}</span>
                    <span className="col-2">
                        <input
                            type="checkbox"
                            name="done"
                            checked={this.props.done ? 1 : ""}
                            onChange={(event) => {
                                this.props.toggleDone(this.props.index)
                                this.onCheckboxChange(event, this.props.id, this.props.done, this.props.value)
                        }
                        }
                    /></span>
                    <button
                        onClick={() => this.onUpdate(window.event, this.props)}>Save
                    </button>
                    <button onClick={(event) => {
                        this.props.removeTodo(this.props.id)
                        this.onDelete(event, this.props.id)
                    }
                    }>Delete
                    </button>
                </div>

            </form>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = (dispatch) => ({
    editTodo: payload => dispatch(editTodo(payload)),
    removeTodo: id => dispatch(removeTodo(id)),
    toggleDone: index => dispatch(toggleDone(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)