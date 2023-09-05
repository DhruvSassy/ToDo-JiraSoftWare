import { ADD_TODO, CHANGE_TASK_STATUS, DELETE_TODO, EDIT_TODO } from '../action/constant';

const initialState = {
  tasks: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case EDIT_TODO:
      const updatedTaskData = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );

      return {
        ...state,
        tasks: updatedTaskData,
      };

    case DELETE_TODO:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };

    case CHANGE_TASK_STATUS:
      const { taskId, newStatus } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
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
