import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../action/constant';

const initialState = {
  todo: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };

    case EDIT_TODO:
      const updatedTodo = action.payload;
      const updatedTodoData = state.todo.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      return {
        ...state,
        todo: updatedTodoData,
      };

    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
