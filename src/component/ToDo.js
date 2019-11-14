import React from 'react'

import URL_POSTS from '../api/constants'

class ToDo extends React.Component {
    onSubmit = (event, id) => {
        event.preventDefault()
        const res = window.confirm(`Delete id: ${id}?`)
        if (res) {
            fetch(URL_POSTS + `${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(res => console.log(res))
        }
    }

    onUpdate = (event, id, value, done) => {
        event.preventDefault()

        const res = window.confirm(`Update id: ${id}?`)
        if (res) {
            fetch(URL_POSTS + `${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({"author": "km", "title": value, "done" : done})
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => alert(err))
        }
    }

    onCheckboxChange = (event, id, checked, value) => {
        let change = ''
        if (checked == 'Done') {
            change = ''
        }
        else {
            change = 'Done'
        }
        const res = window.confirm(`Update id: ${id}?`)
        if (res) {
            fetch(URL_POSTS + `${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content
                },
                body: JSON.stringify({done : change, "author": "km", "title": value})
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => alert(err))
        }
    }

    render() {
        return (<div id="wrapper" className="container">
            <form onSubmit={() => this.onSubmit(window.event, this.props.id)}>
                <tr>{this.props.id}
                    <td><input
                        size={20}
                        key={this.props.id}
                        value={this.props.value}
                        name={this.props.name}
                        index={this.props.index}
                        onChange={(ev) => this.props.onChange(ev, this.props.index)}
                        type="text"
                    /></td>
                    <td>{this.props.done}</td>
                    <td><input
                        type="checkbox"
                        name="done"
                        checked={this.props.done ? "true" : ""}
                        onChange={(event) => this.onCheckboxChange(event, this.props.id, this.props.done, this.props.value)}
                    /></td>
                    <button onClick={() => this.onUpdate(window.event, this.props.id, this.props.value, this.props.done)}>Update</button>
                    <button name="delete">Delete</button>
                </tr>
            </form>
        </div>)
    }
}

export default ToDo