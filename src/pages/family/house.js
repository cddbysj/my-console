// ** 与房子有关的信息展示页面 ** //
import React from "react";
import { Table } from "antd";

const { Column } = Table;

const badNeighbours = [
  {
    name: "张影",
    build: "7",
    room: "501",
    wechat: "Sandy",
    key: "Sandy"
  },
  {
    name: "周朦",
    build: "7",
    room: "1404",
    wechat: "无瞳",
    key: "无瞳"
  },
  {
    name: " ",
    build: "7",
    room: "1402",
    wechat: " ",
    key: " "
  },
  {
    name: "蒋利民",
    build: "7",
    room: "804",
    wechat: "如刀__秋叶",
    key: "如刀__秋叶"
  },
  {
    name: "梁冰",
    build: "7",
    room: "1002",
    wechat: "L",
    key: "L"
  },
  {
    name: "王晶晶",
    build: "7",
    room: "1604",
    wechat: "菁菁",
    key: "菁菁"
  },
  {
    name: "徐敏琦",
    build: "7",
    room: "1203",
    wechat: ".",
    key: "."
  },
  {
    name: "杨烨",
    build: "7",
    room: "803",
    wechat: "叶子",
    key: "叶子"
  },
  {
    name: "曹艳荣",
    build: "7",
    room: "1304",
    wechat: "兴业曹艳荣",
    key: "兴业曹艳荣"
  },
  {
    name: "刘德翔",
    build: "7",
    room: "1701",
    wechat: "刘德翔",
    key: "刘德翔"
  },
  {
    name: "覃瑜",
    build: "7",
    room: "901",
    wechat: "覃瑜",
    key: "覃瑜"
  },
  {
    name: "王卉",
    build: "8",
    room: "503",
    wechat: "阑珊",
    key: "阑珊"
  },
  {
    name: "李桂媛",
    build: "8",
    room: "1304",
    wechat: "木子媛",
    key: "木子媛"
  },
  {
    name: "鲍丽",
    build: "8",
    room: "1401",
    wechat: "兵哥",
    key: "兵哥"
  },
  {
    name: "彭建希",
    build: "8",
    room: "804",
    wechat: "木朝颜",
    key: "木朝颜"
  },
  {
    name: "李杰",
    build: "8",
    room: "304",
    wechat: "好好好好的",
    key: "好好好好的"
  },
  {
    name: "汪纯",
    build: "8",
    room: "404",
    wechat: "leave",
    key: "leave"
  }
];

const HousePage = props => {
  return (
    <div>
      <Table
        footer={() =>
          `截止到 2019-12-23 大活动，未缴纳基本费用却在微信群里享受资源和服务的部分黑名单`
        }
        dataSource={badNeighbours}
      >
        <Column title="业主名" dataIndex="name" key="name" />
        <Column title="栋号" dataIndex="build" key="build" />
        <Column title="房号" dataIndex="room" key="room" />
        <Column title="微信号" dataIndex="wechat" key="wechat" />
      </Table>
    </div>
  );
};

export default HousePage;
