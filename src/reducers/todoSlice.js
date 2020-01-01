import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        console.log('add todo');
        const { id, text } = action.payload;
        state.push({ id, text, completed: false });
      },
      prepare(text) {
        return { payload: { id: nextTodoId++, text } };
      },
    },
    toggleTodo(state, action) {
      const { id } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo(state, action) {
      const { id } = action.payload;
      const index = state.findIndex(todo => todo.id === id);
      if (index > -1) state.splice(index, 1);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
