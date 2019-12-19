import React from 'react';
import './App.css';

import Routing from './containers/Routing/Routing'

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {all, call, takeLatest, put} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import todos from './reducers/todos'
import {watchersTodos, callShowSpinner} from './reducers/watchers';
import {asyncTypes} from "./reducers/asyncTypes";
import {SHOW_SPINNER_ASYNC} from "./actions/todos";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare, thunkMiddleware];

const store = createStore(todos,
    composeEnhancers(applyMiddleware(...middleware)),
);

function* rootSaga() {
    yield takeLatest(asyncTypes.SHOW_SPINNER_ASYNC, callShowSpinner)
    // TODO: add more watchers;
    yield all([
        call(watchersTodos),
    ]);

}

sagaMiddleWare.run(rootSaga);

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
