// ** 产品参数确认 ** //
import React, { useState } from "react";
import { Button } from "antd";
import CreateOrderForm from "pages/work/order/createOrderForm";

const Params = props => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCreate = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        新建订单
      </Button>
      <CreateOrderForm
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Params;
