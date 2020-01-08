// ** 合格证统一管理页面 ** //

import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Form,
  Tag,
  Spin,
  Tabs,
  Icon,
  List,
  Card,
  Empty,
  Tooltip,
  Input,
  InputNumber,
  DatePicker
} from "antd";
import firebase from "api/firebase";
import styles from "./certificate.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const { TabPane } = Tabs;

// 以中文格式显示时间
const showTimeInCN = date => new Date(date).toLocaleString("zh-Hans-CN");

const CertificatesManagePage = props => {
  const { getFieldDecorator, validateFieldsAndScroll } = props.form;

  // 用于展示的合格证卡片信息
  const [certificates, setCertificates] = useState(null);
  // 合格证卡片队列，一次最多打印 9 个。
  const [cardQueue, setCardQueue] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.certificates().onSnapshot(snapshot => {
      const certificates = [];
      snapshot.forEach(doc => {
        // 转化成想要的结构，用于展示
        const {
          orderId,
          arrivalAt,
          products,
          preparePrintAt,
          printDone
        } = doc.data();
        Object.keys(products).forEach(name =>
          certificates.push({
            ...products[name],
            name,
            orderId,
            arrivalAt,
            preparePrintAt,
            printDone
          })
        );
      });

      setCertificates(certificates);
    });
    return unsubscribe;
  }, []);

  const onPrint = () => {
    window.print();
  };

  const showDetail = card => {
    console.log(card);
  };

  const addToCardQueue = async card => {
    await firebase.finishCertificatesPrint(card.orderId, true);
    setCardQueue(prev => [card, ...prev]);
  };

  const fillCard = event => {
    event.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        //
        console.log("received values: ", values);
      } else {
        console.log("sth wrong!");
      }
    });
  };

  return (
    <Tabs defaultActiveKey="plan">
      <TabPane tab="计划" key="plan">
        <div className={cx("noPrint", "planArea")}>
          <h1>合格证页面，由数据直接生成可打印的合格证</h1>
          <p>
            备注：产品的合格证是以一个订单为基本单位，同一订单内的所有产品合格证应该同时被添加到打印队列，同时完成打印，以及同时被删除。
          </p>
          {certificates ? (
            <List
              grid={{ gutter: 16, xl: 6, md: 4 }}
              footer="合格证不足 9 个时，可考虑用常见的浸没式加热器合格证填充"
              dataSource={certificates}
              renderItem={item => (
                <List.Item>
                  <Card
                    actions={[
                      <Tooltip title="添加到打印列表">
                        <Icon
                          type="plus-circle"
                          key="plus"
                          theme="twoTone"
                          onClick={() => addToCardQueue(item)}
                        />
                      </Tooltip>,
                      <Icon type="edit" key="edit" />,
                      <Icon type="ellipsis" key="ellipsis" />
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
                    <p>创建日期：{showTimeInCN(item.preparePrintAt)}</p>
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
          <Button icon="printer" type="primary" onClick={onPrint}>
            打印
          </Button>
        </div>
        {cardQueue.length ? (
          <div className={styles.cardArea}>
            {cardQueue.map(card =>
              Array.from(new Array(card.quantity)).map((item, index) => (
                <div
                  key={`${card.name}-${card.arrivalAt}-${index}`}
                  onClick={() => showDetail(card)}
                >
                  <div className={styles.container}>
                    <section className={styles.cardHeader}>
                      <p className={styles.title}>SEMEM</p>
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
        <Form onSubmit={fillCard} layout="inline">
          <Form.Item label="产品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入产品名称"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator("quantity", {
              initialValue: 1
            })(<InputNumber min={1} max={9} />)}
          </Form.Item>
          <Form.Item label="结构形式">
            {getFieldDecorator("model", { initialValue: "HJ" })(<Input />)}
          </Form.Item>
          <Form.Item label="检验日期">
            {getFieldDecorator("arrivalAt", {
              initialValue: moment(),
              rules: [
                {
                  required: true,
                  message: "请指定检验日期"
                }
              ]
            })(<DatePicker />)}
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

export default Form.create({ name: "fill_card" })(CertificatesManagePage);
