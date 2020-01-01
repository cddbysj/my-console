import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { addTodo, toggleTodo, removeTodo } from 'reducers/todoSlice';
import { fetchOrders } from 'reducers/ordersSlice';

const OrdersPage = props => {
  const dispatch = useDispatch();
  const { orders, error, isLoading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (error) return <div>something is wrong...</div>;
  return (
    <div>
      <h2>Orders list</h2>
      {isLoading && <div>Loading...</div>}
      <ul>
        {orders &&
          orders.map(order => (
            <li key={order.id}>
              {order.consumer}---{order.product}
            </li>
          ))}
      </ul>
    </div>
  );
};

const Todos = props => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const onAddTodo = text => {
    dispatch(addTodo(text));
  };
  const onToggleTodo = id => {
    dispatch(toggleTodo({ id }));
  };
  const onRemoveTodo = id => {
    dispatch(removeTodo({ id }));
  };
  const onAddTodoDelay = async text => {
    const result = await Promise.resolve('haha');
    dispatch(addTodo(text + result));
  };

  return (
    <div>
      <OrdersPage />
      <button onClick={() => onAddTodo('New Todo!')}>Add todo</button>
      <button onClick={() => onAddTodoDelay('New Todo!')}>
        Add todo delay
      </button>
      <ul>
        {todos &&
          todos.map(todo => (
            <li key={todo.id}>
              {todo.id}-{todo.text}
              <button onClick={() => onToggleTodo(todo.id)}>toggle</button>
              <span>{todo.completed ? '√' : '×'}</span>
              <button onClick={() => onRemoveTodo(todo.id)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
