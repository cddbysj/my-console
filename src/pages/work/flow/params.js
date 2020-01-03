// ** 产品参数确认 ** //
import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const Params = props => {
  const history = useHistory();
  return (
    <div>
      <Button type="primary" onClick={() => history.push("/work/createOrder")}>
        新建订单
      </Button>
    </div>
  );
};

export default Params;
