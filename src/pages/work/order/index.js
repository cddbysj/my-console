import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import firebase from 'api/firebase';
import CreateOrderForm from './createOrderForm';
import OrderTable from './orderTable';

const WorkPage = props => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.orders().onSnapshot(snapshot => {
      console.log('snapshot', snapshot);
      const orders = [];
      snapshot.forEach(doc => orders.push({ ...doc.data(), id: doc.id }));
      setOrders(orders);
    });
    return unsubscribe;
  }, []);

  const removeOrder = async id => {
    await firebase.removeOrder(id);
  };

  const toggleNameplatePrint = async (id, checked) => {
    await firebase.toggleNameplatePrint(id, checked);
  };

  const toggleCertificatePrint = async (id, checked) => {
    await firebase.toggleCertificatePrint(id, checked);
  };

  return (
    <div>
      <CreateOrderForm />
      <ul>
        {orders ? (
          <OrderTable
            orders={orders}
            onRemoveOrder={removeOrder}
            onToggleNameplatePrint={toggleNameplatePrint}
            onToggleCertificatePrint={toggleCertificatePrint}
          />
        ) : (
          <Spin />
        )}
      </ul>
    </div>
  );
};

export default WorkPage;
