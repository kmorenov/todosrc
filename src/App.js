import React from 'react';
import './App.css';

import Routing from './containers/Routing/Routing'

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import todos from './reducers/todos'

import {useState, useReducer} from 'react'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todos,
    composeEnhancers(applyMiddleware(
        thunkMiddleware,
    )))

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <Routing/>
                </header>
            </div>
        </Provider>
    );
}

export default App;
