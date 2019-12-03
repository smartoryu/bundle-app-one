import { ADD_TODO, DEL_TODO, EDIT_TODO, CANCEL_TODO, SAVE_TODO, RENDER_TODO } from "../actions/actionTypes";

export const addTodo=(state)=> {
  return {
    type: ADD_TODO,
    activity = state.activity,
    status: false,
    date = state.date
  }
}
