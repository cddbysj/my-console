import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import firebase from "api/firebase";
import OrderTable from "./orderTable";

const WorkPage = props => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.orders().onSnapshot(snapshot => {
      const orders = [];
      // doc.data() 得到的仅仅是用于展示目的的数据，拼接 id 属性进去，利于后续操作单个对应的订单
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

  const createCertificates = async (id, certificateInfo) => {
    await firebase.createCertificates(id, certificateInfo);
  };

  const removeCertificates = async id => await firebase.removeCertificates(id);

  return (
    <div>
      {orders ? (
        <OrderTable
          orders={orders}
          onRemoveOrder={removeOrder}
          onToggleNameplatePrint={toggleNameplatePrint}
          onToggleCertificatePrint={toggleCertificatePrint}
          createCertificates={createCertificates}
          removeCertificates={removeCertificates}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default WorkPage;
