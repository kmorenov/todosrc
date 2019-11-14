import React, {Component} from 'react'
class Api extends Component{
    constructor(props){
        super(props)
    }

   getTodos = () => {
        const url = 'http://localhost:3000/posts'
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                // this.setState({photos: response})
                console.log(response);
            })
    }

}
export default Api
