import { combineReducers } from 'redux';

import { Action } from './interfaces';
import Type from './types';
import { updateItemInArray, updateObject, createReducer, createAsyncHandlers, updateState } from './utils';

function addTodo(todosState: Record<string, unknown>[], action: Action) {
  const newTodos = todosState.concat({
    id: action.payload?.data.id,
    text: action.payload?.data.text,
    completed: false,
  });

  return newTodos;
}

function toggleTodo(todosState: Record<string, unknown>[], action: Action) {
  const newTodos = updateItemInArray(todosState,'id', action.payload?.data.id, (todo: Record<string, unknown>) => updateObject(todo, { completed: !todo.completed }));

  return newTodos;
}

function editTodo(todosState: Record<string, unknown>[], action: Action) {
  const newTodos = updateItemInArray(todosState,'id', action.payload?.data.id, (todo: Record<string, unknown>) => updateObject(todo, { text: action.payload?.data.text }));

  return newTodos;
}

// Redux best practice
const todosReducer = createReducer([], {
  [Type.ADD_TODO]: addTodo,
  [Type.TOGGLE_TODO]: toggleTodo,
  [Type.EDIT_TODO]: editTodo,
});

// these pattern should not really be use, these exist for compatibility purpose only
const dataReducer = createReducer({}, {
  [Type.SAVE_DATA]: (state,action) => updateState(state,action),
});

const profileReducer = createReducer({},{
  ...createAsyncHandlers(Type.GET_DATA_ASYNC,(state,action) => updateState(state,action)),
});

// see https://redux.js.org/style-guide/style-guide#name-state-slices-based-on-the-stored-data
const rootReducer = combineReducers({
  todo: todosReducer,
  someData: dataReducer,
  profile: profileReducer,
});

export default rootReducer;
