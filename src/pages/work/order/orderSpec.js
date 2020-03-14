// ** 展示所有技术参数的页面 ** //
import React from 'react';
import { useLocation } from 'react-router-dom';

// 树形展开所有属性
const OrderSpecPage = () => {
  const products = useLocation().state;
  return (
    <div>
      技术参数页面 展示所有的技术参数
      <ul>
        {products.map(product => (
          <li key={product.name}>
            {Object.keys(product).map(k => (
              <p key={k}>
                {k}: {product[k]}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSpecPage;
