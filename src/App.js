import React from 'react';
import './App.css';

import Routing from './containers/Routing/Routing'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { all, call } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import todos from './reducers/todos'
import { watchersTodos } from './reducers/watchers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare, thunkMiddleware];

const store = createStore(todos,
  composeEnhancers(applyMiddleware(...middleware)),
);

function* rootSaga() {
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
