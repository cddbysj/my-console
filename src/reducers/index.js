import { combineReducers } from 'redux';
import todosReducer from './todoSlice';
import ordersReducer from './ordersSlice';

export default combineReducers({
  todos: todosReducer,
  orders: ordersReducer,
});
