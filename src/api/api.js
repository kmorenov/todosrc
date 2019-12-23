// Constants
import API_URL from './constants';

const axios = require('axios');

class Api {
    getTodos() {
        return axios.get(API_URL + '/posts')
            .then(res => res.data)
            .catch(err => alert(err));
    }

    addTodoButtton(data) {
        return fetch(API_URL + '/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(err => alert(err));
    }

    saveTodoFromJsonServer(data) {
        return fetch(API_URL + '/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify(data)
        })
          .then(res => res.json())
        .then((data) => {
            // alert('added ToDo to backend');
            return data;
        })
        .catch(err => alert(err));
    }

    deleteTodo(id) {
        return fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => alert(err));
    }

    updateTodo(id, data) {
        return fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .catch(err => alert(err))
    }


}

export default new Api();
