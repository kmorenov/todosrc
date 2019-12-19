// Core
import {
  apply, all, call, takeEvery, put,
} from 'redux-saga/effects';
// Api
import Api from '../api/api';
// Types
import { asyncTypes } from './asyncTypes';
import {ADD_TODOS_BULK, SHOW_SPINNER_ASYNC} from '../actions/todos';

let generatedId = 100

function* callGetTodosFromServer() {
  const todos = yield fetch('https://jsonplaceholder.typicode.com/todos/4')
    .then(res => res.json())
    .catch(console.error);

  const data = {
    author: todos.author,
    title: todos.title,
  };

  const todoItem = yield apply(Api, Api.saveTodoFromJsonServer, [data]);

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

export function* watchersTodos() {
  yield all([
    call(watchGetTodosFromServer),
  ]);
}

export function* callShowSpinner() {
  if (window.confirm('in callShowSpinner')){
    const action = {
      type: SHOW_SPINNER_ASYNC,
      payload: {author: 'callShowSpinner',
                id: generatedId++,
                title: 'Saga trial'}
    };

    yield put(action);
  }
}