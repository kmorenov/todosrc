// Constants
import API_URL from './constants';

class Api {
   getTodos() {
     return fetch(API_URL + '/posts')
       .then(res => res.json())
       .catch(err => alert(err));
   }

   addTodo(data) {
     return fetch(API_URL + '/posts', {
       method: 'POST',
       headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content
       },
       body: JSON.stringify(data)
     }).then(res => res.json())
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
