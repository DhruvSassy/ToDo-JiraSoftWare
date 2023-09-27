import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS,
} from './constant';

export const addTask = (box) => ({
  type: ADD_TASK,
  payload: box,
});

export const editTask = (data) => ({
  type: EDIT_TASK,
  payload: data,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const changeTaskStatus = (taskId, statusId) => ({
  type: CHANGE_TASK_STATUS,
  payload: {
    taskId,
    statusId,
  },
});

