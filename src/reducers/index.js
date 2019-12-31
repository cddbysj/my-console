import { combineReducers } from "redux";
import todosReducer from "./todoSlice";

console.log("todosReducer: ", todosReducer);

export default combineReducers({
  todos: todosReducer
});
