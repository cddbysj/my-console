// ** 工作流程页面 ** //
import React, { useState } from "react";
import { Steps, Button, message } from "antd";

import Params from "./params";

const { Step } = Steps;

const steps = [
  {
    title: "参数确认",
    content: <Params />
  },
  {
    title: "制作采购合同",
    content: <div>制作采购合同</div>
  },
  {
    title: "发送采购合同",
    content: <div>发送采购合同</div>
  },
  {
    title: "在 CRM 下单",
    content: <div>下单</div>
  },
  {
    title: "铭牌打印",
    content: <div>铭牌打印</div>
  }
];

const WorkFlowPage = props => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(prev => prev + 1);
  };
  const prev = () => {
    setCurrent(prev => prev - 1);
  };

  return (
    <div>
      <Steps current={current} size="small">
        {steps.map(step => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div
        style={{
          minHeight: 200,
          margin: "20px 0",
          border: "1px dashed #e9e9e9",
          borderRadius: 6,
          backgroundColor: "#fafafa"
        }}
      >
        {steps[current].content}
      </div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("流程结束", 1)}>
            完成
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={prev}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkFlowPage;
