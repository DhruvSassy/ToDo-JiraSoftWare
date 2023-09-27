import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS,
} from '../action/constant';

const initialState = {
  tasks: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case EDIT_TASK:
      const updatedTaskData = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );

      return {
        ...state,
        tasks: updatedTaskData,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };

      case CHANGE_TASK_STATUS:
      const { taskId, statusId } = action.payload;

      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: statusId } : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };

    default:
      return state;
  }
};

export default todoReducer;
