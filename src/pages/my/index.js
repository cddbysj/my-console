import React from "react";
import { Table } from "antd";

const { Column } = Table;

const data = [
  {
    name: "张影",
    build: "7",
    room: "501",
    wechat: "Sandy"
  },
  {
    name: "周朦",
    build: "7",
    room: "1404",
    wechat: "无瞳"
  },
  {
    name: "",
    build: "7",
    room: "1402",
    wechat: ""
  },
  {
    name: "蒋利民",
    build: "7",
    room: "804",
    wechat: "如刀__秋叶"
  },
  {
    name: "梁冰",
    build: "7",
    room: "1002",
    wechat: "L"
  },
  {
    name: "王晶晶",
    build: "7",
    room: "1604",
    wechat: "菁菁"
  },
  {
    name: "徐敏琦",
    build: "7",
    room: "1203",
    wechat: "."
  },
  {
    name: "杨烨",
    build: "7",
    room: "803",
    wechat: "叶子"
  },
  {
    name: "曹艳荣",
    build: "7",
    room: "1304",
    wechat: "兴业曹艳荣"
  },
  {
    name: "刘德翔",
    build: "7",
    room: "1701",
    wechat: "刘德翔"
  },
  {
    name: "覃瑜",
    build: "7",
    room: "901",
    wechat: "覃瑜"
  },
  {
    name: "王卉",
    build: "8",
    room: "503",
    wechat: "阑珊"
  },
  {
    name: "李桂媛",
    build: "8",
    room: "1304",
    wechat: "木子媛"
  },
  {
    name: "鲍丽",
    build: "8",
    room: "1401",
    wechat: "兵哥"
  },
  {
    name: "彭建希",
    build: "8",
    room: "804",
    wechat: "木朝颜"
  },
  {
    name: "李杰",
    build: "8",
    room: "304",
    wechat: "好好好好的"
  },
  {
    name: "汪纯",
    build: "8",
    room: "404",
    wechat: "leave"
  }
];

const My = props => (
  <div>
    <Table
      footer={() =>
        `截止到 2019-12-23 大活动，未缴纳基本费用却在微信群里享受资源和服务的部分黑名单`
      }
      dataSource={data}
      rowkey={record => record.name}
    >
      <Column title="业主名" dataIndex="name" key="name" />
      <Column title="栋号" dataIndex="build" key="build" />
      <Column title="房号" dataIndex="room" key="room" />
      <Column title="微信号" dataIndex="wechat" key="wechat" />
    </Table>
  </div>
);

export default My;
