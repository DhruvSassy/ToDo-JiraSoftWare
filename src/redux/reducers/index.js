
import { ADD_BOX ,DELETE_BOX} from "../action/constant";

  
  const initialState = {
    todo: [],
  
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_BOX :
      return{
        ...state,
        todo: [...state.todo, action.payload],
      }
      case DELETE_BOX:
      return {
        ...state,
        todo: state.todo.filter((_, index) => index !== action.payload),
      };
        
      default:
        return state;
    }
  };
  
  export default todoReducer;
  