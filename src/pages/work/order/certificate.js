// ** 合格证页面，由数据直接生成可打印的合格证 ** //
import React from 'react';
import { Button, Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import styles from './certificate.module.css';
import { PrinterOutlined } from '@ant-design/icons';

const CertificatePage = () => {
  const { products, arrivalAt } = useLocation().state;

  const onPrint = () => {
    window.print();
  };

  return (
    <div>
      <div className={styles.noPrint}>
        <Button icon={<PrinterOutlined />} type="primary" onClick={onPrint}>
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
