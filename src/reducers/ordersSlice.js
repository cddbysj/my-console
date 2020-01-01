import { createSlice } from '@reduxjs/toolkit';
import firebase from 'api/firebase';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrdersStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getOrdersFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOrder(state, action) {
      state.push(action.payload);
    },
    removeOrder(state, action) {},
  },
});

export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailed,
  addOrder,
  removeOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const fetchOrders = () => async dispatch => {
  try {
    dispatch(getOrdersStart());
    const snapshot = await firebase.getOrders();
    const orders = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // timestamp 属性无法序列化，redux 会报错
      delete data.timestamp;
      data.id = doc.id;
      orders.push(data);
    });
    dispatch(getOrdersSuccess(orders));
  } catch (error) {
    dispatch(getOrdersFailed(error.toString()));
  }
};
