// ** 展示所有技术参数的页面 ** //
import React from 'react';
import { useLocation } from 'react-router-dom';

// 树形展开所有属性
const OrderSpecPage = () => {
  const params = useLocation().state;
  return (
    <div>
      技术参数页面 展示所有的技术参数
      <ul>
        {Object.keys(params).map((k, index) => (
          <li key={index}>
            {k}: {JSON.stringify(params[k], null, 4)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSpecPage;
