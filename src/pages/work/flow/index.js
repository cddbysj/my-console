// ** 工作流程页面 ** //
import React, { useState } from "react";
import { Steps, Button, message } from "antd";

import Params from "./params";
import ContractPanel from "./contractPanel";

const { Step } = Steps;

const steps = [
  {
    title: "参数确认",
    content: <Params />
  },
  {
    title: "制作采购合同",
    content: <ContractPanel />
  },
  {
    title: "发送采购合同",
    content: (
      <div>
        <a
          href="https://mail.qq.com/cgi-bin/frame_html?sid=2tq_5c2Dt8fOMkEf&r=ba4f18e27a212e38f7e5be5b900066ce"
          rel="noopener noreferrer"
          target="_blank"
        >
          QQ mail
        </a>
      </div>
    )
  },
  {
    title: "在 CRM 下单",
    content: (
      <div>
        <a
          href="https://crm.xtcrm.com/lib/purchase/"
          rel="noopener noreferrer"
          target="_blank"
        >
          XTools CRM
        </a>
      </div>
    )
  },
  {
    title: "铭牌打印",
    content: <div>铭牌打印</div>
  }
];

const WorkFlowPage = props => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Steps current={current} onChange={current => setCurrent(current)}>
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
    </div>
  );
};

export default WorkFlowPage;
