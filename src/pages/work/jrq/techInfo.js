import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

const TechInfo = () => (
  <div style={{ maxWidth: 1000 }}>
    <Title level={4}>不锈钢耐氯离子腐蚀</Title>
    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      关于不锈钢材质耐氯离子腐蚀标准可参照《火电厂循环水处理》一书，其第 179
      页，明确约定：
    </Paragraph>
    <Paragraph>304不锈钢氯离子含量必须小于 200mg/L；</Paragraph>
    <Paragraph>316不锈钢氯离子含量必须小于 1000mg/L；</Paragraph>
    <Paragraph>
      317不锈钢氯离子含量必须小于 5000mg/L。按照 25℃ 的最高温度考虑。
    </Paragraph>
    <Title level={4}>管道式非标法兰</Title>
    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      管道式加热器的进出水两侧的法兰均为非标法兰，具体表现为法兰内径比国标法兰要小。比如
      DN65 的国标法兰，内径为 65mm，而加热器出水侧法兰内径约为
      50mm，进水侧法兰内径则更加小。但是螺栓孔和中心距与国标法兰相同，是可以与国标法兰配合安装的。管道式加热器的蒸汽侧法兰为国标法兰。
    </Paragraph>
    <Title level={4}>产品标准</Title>
    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      所有加热器产品按照《JB/T 7660-95》这一标准生产。
    </Paragraph>
    <Title level={4}>加热器的喉部口径计算</Title>
    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      喉部口径按照 165t/h 的水流量下，直径取 80mm 为基准值，此时的喉部流速为
      9.1229 m/s。计算喉部口径时假设流速为 9.1229 m/s 来算出对应流量的口径。
    </Paragraph>
    <Title level={4}>加热器的芯体斜孔数量计算</Title>
    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      以型号 QSH-48 为基准来计算斜孔数量。即水的流量为 165t/h，加热温差从 5℃
      加热到 65℃ ，0.4 MPa 饱和蒸汽流量为 16724.99 kg/h，此时的斜孔数量取 720。
    </Paragraph>
  </div>
);

export default TechInfo;
