import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../action/constant';

const initialState = {
  ToDo: [],
  InProgress: [],
  QA: [],
  Done: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        ToDo: [...state.ToDo, action.payload],
      };

      case EDIT_TODO:
      const updatedTodoData = state.ToDo.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      const updatedInProgressData = state.InProgress.map((inProgress) =>
        inProgress.id === action.payload.id ? action.payload : inProgress
      );
      const updatedQaData = state.QA.map((qa) =>
        qa.id === action.payload.id ? action.payload : qa
      );
      const updatedDoneData = state.Done.map((done) =>
        done.id === action.payload.id ? action.payload : done
      );
      return {
        ...state,
        ToDo: updatedTodoData,
        InProgress: updatedInProgressData,
        QA: updatedQaData,
        Done: updatedDoneData,
      };
    

      case DELETE_TODO:
      return {
        ...state,
        ToDo: state?.ToDo?.filter((item) => item?.id !== action?.payload),
        InProgress:  state?.InProgress?.filter((item) => item?.id !== action?.payload),
        QA:  state?.QA?.filter((item) => item?.id !== action?.payload),
        Done:  state?.Done?.filter((item) => item?.id !== action?.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
