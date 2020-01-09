// ** 合格证页面，由数据直接生成可打印的合格证 ** //
import React, { useState, useEffect } from "react";
import { Button, Tag } from "antd";
import firebase from "api/firebase";
import { useLocation } from "react-router-dom";
import styles from "./certificate.module.css";

const CertificatePage = () => {
  const { products, arrivalAt } = useLocation().state;
  const [certificates, setCertificates] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.certificates().onSnapshot(snapshot => {
      const certificates = [];
      snapshot.forEach(doc => certificates.push({ ...doc.data(), id: doc.id }));
      setCertificates(certificates);
    });
    return unsubscribe;
  }, []);

  const onPrint = () => {
    window.print();
  };

  return (
    <div>
      <div className={styles.noPrint}>
        <div>{JSON.stringify(certificates, null, 2)}</div>
        <h1>合格证页面，由数据直接生成可打印的合格证</h1>
        <p>1.如何设置 CSS 样式，使合格证按照期望的样式打印</p>
        <p>2.为了充分利用纸张的空间，使用九宫格布局打印</p>
        <p>3.如果一次只有3个合格证需要打印，如何自动填充浸没式合格证</p>
        <p>{JSON.stringify(products, null, 2)}</p>
        <Button icon="printer" type="primary" onClick={onPrint}>
          打印
        </Button>
      </div>
      <div id="certificate-card" className={styles.cardArea}>
        {products.map((product, index) => (
          <div key={index} className={styles.container}>
            <section className={styles.cardHeader}>
              <p className={styles.title}>SEMEM</p>
              <p>{product.model} Heater</p>
              <p>检验合格证明书</p>
            </section>
            <section className={styles.cardBody}>
              <p>
                名称：
                <span className={styles.productName}>{product.name}</span>
              </p>
              <p>
                检验员：<Tag color="red">0306</Tag>
              </p>
              <p>检验日期：{arrivalAt}</p>
              <p>本产品经检验合格，符合标准，准予出厂。</p>
            </section>
            <section className={styles.cardFooter}>
              <p className={styles.seal}>
                <Tag color="red">西门机电品质检验中心</Tag>
              </p>
              <p>湖南西门机电科技有限公司</p>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatePage;
