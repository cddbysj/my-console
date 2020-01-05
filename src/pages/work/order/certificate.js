// ** 合格证页面，由数据直接生成可打印的合格证 ** //
import React from 'react';
import { useLocation } from 'react-router-dom';

const CertificatePage = () => {
  const info = useLocation().state;
  return (
    <div>
      <h1>合格证页面，由数据直接生成可打印的合格证</h1>
      <p>1.如何设置 CSS 样式，使合格证按照期望的样式打印</p>
      <p>2.为了充分利用纸张的空间，使用九宫格布局打印</p>
      <p>3.如果一次只有3个合格证需要打印，如何自动填充浸没式合格证</p>
      <p>{JSON.stringify(info, null, 2)}</p>
    </div>
  );
};

export default CertificatePage;
