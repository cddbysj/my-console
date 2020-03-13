// ** 工作步骤组件 ** //
import React, { useState } from "react";
import { Steps } from "antd";
import * as ROUTES from "constants/routes";
import { Link } from "react-router-dom";

const { Step } = Steps;

const WorkFlowPage = props => {
  const [current, setCurrent] = useState(0);

  const handleChange = current => {
    setCurrent(current);
  };

  return (
    <Steps
      current={current}
      size="small"
      onChange={handleChange}
      style={{ maxWidth: 900 }}
    >
      <Step title={<Link to={ROUTES.WORK_JRQ}>参数确认</Link>} />
      <Step title={<Link to={ROUTES.CREATE_ORDER}>新建订单</Link>} />
      <Step
        title={
          <a href={ROUTES.QQ_MAIL} rel="noopener noreferrer" target="_blank">
            发送合同
          </a>
        }
      />
      <Step
        title={
          <a href={ROUTES.CRM} rel="noopener noreferrer" target="_blank">
            XTools
          </a>
        }
      />
      <Step title={<Link to={ROUTES.WORK_ORDERS}>铭牌打印</Link>} />
      <Step title={<Link to={ROUTES.WORK_CERTIFICATES}>合格证打印</Link>} />
    </Steps>
  );
};

export default WorkFlowPage;
