// ** 合格证统一管理页面 ** //

import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Form,
  Tag,
  Spin,
  Tabs,
  List,
  Card,
  Empty,
  Tooltip,
  Input,
  Radio,
  InputNumber,
  DatePicker,
  message
} from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  EllipsisOutlined,
  PrinterOutlined,
  DeleteOutlined,
  BulbTwoTone,
  MinusOutlined
} from "@ant-design/icons";
import firebase from "api/firebase";
import useCertificates from "hooks/useCertificates";
import styles from "./certificate.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const { TabPane } = Tabs;

// 以中文格式显示时间
const showTimeInCN = date => new Date(date).toLocaleString("zh-Hans-CN");

const CertificatesManagePage = props => {
  const [filter, setFilter] = useState("SHOW_ACTIVE");
  const certificates = useCertificates(filter);

  // 合格证卡片队列，一次最多打印 9 个。
  const initialCardQueue = JSON.parse(localStorage.getItem("cardQueue")) || [];
  const [cardQueue, setCardQueue] = useState(initialCardQueue);

  useEffect(() => {
    localStorage.setItem("cardQueue", JSON.stringify(cardQueue));
    return () => localStorage.removeItem("cardQueue");
  });

  // 调用 Web API 启用打印机
  const onPrint = () => {
    window.print();
  };

  // 清空添加到打印队列的合格证
  const onClearAll = () => {
    setCardQueue([]);
  };

  const addToCardQueue = async card => {
    await firebase.finishCertificatesPrint(card.orderId, true);
    setCardQueue(prev => [card, ...prev]);
    message.success("已添加到打印列表", 0.5);
  };

  const fillCard = values => {
    console.log("received values: ", values);
    const { arrivalAt } = values;
    setCardQueue(prev => [
      { ...values, arrivalAt: arrivalAt.format("YYYY-MM") },
      ...prev
    ]);
    message.success("添加合格证成功", 0.5);
  };

  const removeCard = cardName => {
    console.log("remove card");
    setCardQueue(prev => prev.filter(card => card.name !== cardName));
  };

  // 设置合格证可见性：未打印、已打印、全部
  const setVisibilityFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <Tabs defaultActiveKey="plan">
      <TabPane tab="计划" key="plan">
        <div className={cx("noPrint", "planArea")}>
          <div className={styles.filter}>
            <Radio.Group onChange={setVisibilityFilter} defaultValue="未打印">
              <Radio.Button value="SHOW_ACTIVE">未打印</Radio.Button>
              <Radio.Button value="SHOW_ALL">全部</Radio.Button>
              <Radio.Button value="SHOW_COMPLETED">已打印</Radio.Button>
            </Radio.Group>
          </div>
          <p>
            产品的合格证是以一个订单为基本单位，同一订单内的所有产品合格证应该同时被添加到打印队列，同时完成打印，以及同时被删除。
          </p>
          <p>合格证不足 9 个时，可考虑用常见的浸没式加热器合格证填充。</p>
          {certificates ? (
            <List
              grid={{ gutter: 16, xl: 6, md: 4 }}
              dataSource={certificates}
              renderItem={item => (
                <List.Item>
                  <Card
                    actions={[
                      <Tooltip title="添加到打印列表">
                        <PlusCircleTwoTone
                          key="plus"
                          onClick={() => addToCardQueue(item)}
                        />
                      </Tooltip>,
                      <Tooltip title="未完成的功能">
                        <EditTwoTone key="edit" />
                      </Tooltip>,
                      <Tooltip title="未完成的功能">
                        <EllipsisOutlined key="ellipsis" />
                      </Tooltip>
                    ]}
                  >
                    <p>{item.name}</p>
                    <p>数量：{item.quantity} 台</p>
                    <p>
                      状态：
                      {item.printDone ? (
                        <Tag color="#108ee9">已打印</Tag>
                      ) : (
                        <Tag color="#f50">未打印</Tag>
                      )}
                    </p>
                    <p>创建日期：</p>
                    <p>{showTimeInCN(item.preparePrintAt)}</p>
                    <p className={styles.ellipsis}>订单号：{item.orderId}</p>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Spin />
          )}
        </div>
      </TabPane>
      <TabPane tab="预览" key="preview">
        <div className={cx("noPrint", "cardActions")}>
          <Button.Group>
            <Button icon={<PrinterOutlined />} type="primary" onClick={onPrint}>
              打印
            </Button>
            <Button icon={<DeleteOutlined />} type="danger" onClick={onClearAll}>
              清空
            </Button>
          </Button.Group>
          <p>
            <BulbTwoTone />
            <span>
              提示：将鼠标悬停在合格证卡片右上角，可以删除该合格证所属订单所有合格证
            </span>
          </p>
        </div>
        {cardQueue.length ? (
          <div className={styles.cardArea}>
            {cardQueue.map(card =>
              Array.from(new Array(card.quantity)).map((item, index) => (
                <div key={`${card.name}-${card.arrivalAt}-${index}`}>
                  <div className={styles.container}>
                    <section className={styles.cardHeader}>
                      <p className={styles.title}>
                        <span>SEMEM</span>
                        <Button
                          ghost
                          className={styles.noPriFnt}
                          icon={<MinusOutlined />}
                          onClick={() => removeCard(card.name)}
                        />
                      </p>
                      <p>
                        {card.model === "HQS"
                          ? card.name.slice(0, 3)
                          : card.model}{" "}
                        Heater
                      </p>
                      <p>检验合格证明书</p>
                    </section>
                    <section className={styles.cardBody}>
                      <p>
                        名称：
                        <span className={styles.productName}>{card.name}</span>
                      </p>
                      <p>
                        检验员：<Tag color="red">0306</Tag>
                      </p>
                      <p>检验日期：{card.arrivalAt}</p>
                      <p>本产品经检验合格，符合标准，准予出厂。</p>
                    </section>
                    <section className={styles.cardFooter}>
                      <p className={styles.seal}>
                        <Tag color="red">西门机电品质检验中心</Tag>
                      </p>
                      <p>湖南西门机电科技有限公司</p>
                    </section>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <Empty />
        )}
      </TabPane>
      <TabPane tab="填充" key="fill">
        <Form
          onFinish={fillCard}
          layout="inline"
          initialValues={{
            name: "HJ-50C",
            quantity: 1,
            model: "HJ",
            arrivalAt: moment()
          }}
        >
          <Form.Item
            name="name"
            label="产品名称"
            rules={[
              {
                required: true,
                message: "请输入产品名称"
              }
            ]}
          >
            <Input allowClear autoFocus />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="数量"
            rules={[
              {
                required: true,
                message: "请指定数量"
              }
            ]}
          >
            <InputNumber min={1} max={9} />
          </Form.Item>
          <Form.Item
            name="model"
            label="结构形式"
            rules={[{ required: true, message: "请指定结构" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="arrivalAt"
            label="检验日期"
            rules={[{ required: true, message: "请指定检验日期" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              添加
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default CertificatesManagePage;
