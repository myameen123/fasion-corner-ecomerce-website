import React from 'react';

import AmmountSummary from './AmmountSummary';
import ProductInfo from './ProductInfo';

function OrderSummary() {
  return (
    <div>
      <ProductInfo />
      <AmmountSummary />
    </div>
  );
}

export default OrderSummary;
