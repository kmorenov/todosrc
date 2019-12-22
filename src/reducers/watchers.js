// Core
import {
    apply, all, call, takeEvery, put,
} from 'redux-saga/effects';
// Api
import Api from '../api/api';
// Types

import { asyncTypes } from './asyncTypes';

import {ADD_TODOS_BULK, SET_SHOW_SPINNER} from '../actions/todos';

let generatedId = 100

function* callGetTodosFromServer() {

  const todos = yield fetch('https://jsonplaceholder.typicode.com/todos/4')
    .then(res => res.json())
    .catch(console.error);

  const data = {
    author: todos.author,
    title: todos.title,
  };

  const todoItem = yield call(Api.saveTodoFromJsonServer, data);
  // Is Equal
  // const todoItem = yield apply(Api, Api.saveTodoFromJsonServer, [data]);

  const action = {
    type: ADD_TODOS_BULK,
    payload: {
      author: 'json-server',
      id: todoItem.id,
      title: todoItem.title,
    }
  };

  yield put(action);

}

function* watchGetTodosFromServer() {
    yield takeEvery(asyncTypes.GET_TODOS_FROM_SERVER_ASYNC, callGetTodosFromServer);
}


function* watchShowSpinner() {
  yield takeEvery(asyncTypes.SHOW_SPINNER_ASYNC, callShowSpinner);
}

export function* watchersTodos() {

  yield all([
    call(watchGetTodosFromServer),
    call(watchShowSpinner),
  ]);
}

export function* callShowSpinner() {
  const action = {
    type: SET_SHOW_SPINNER,
    payload: {
      author: 'callShowSpinner',
      id: generatedId++,
      title: 'Saga trial',
    }
  };

  yield put(action);
}
