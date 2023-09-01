import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./constant"

export const addTodo = (box) => ({
    type:ADD_TODO,
    payload: box,
});

export const editTodo = (data) => ({
    type:EDIT_TODO,
    payload: data,
});

export const deleteTask = (taskId) => ({
    type: DELETE_TODO,
    payload: taskId,
  });