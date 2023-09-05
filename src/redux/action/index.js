import { ADD_TODO, CHANGE_TASK_STATUS, DELETE_TODO, EDIT_TODO } from "./constant"

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

export const changeTaskStatus = (taskId, newStatus) => ({
    type: CHANGE_TASK_STATUS,
    payload: {
      taskId,
      newStatus,
    },
  });
  