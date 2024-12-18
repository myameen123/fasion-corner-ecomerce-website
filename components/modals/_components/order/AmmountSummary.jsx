import React from 'react';

import styles from './style.module.css';

function AmmountSummary() {
  const calculatFormattedPrice = (price) => {
    const formattedPrice = price.toLocaleString('en-PK', {
      style: 'currency',
      currency: 'PKR',
    });

    return formattedPrice;
  };
  return (
    <div>
      <div className=' flex justify-between border-b'>
        <div className='flex flex-col p-2'>
          <span>MRP Total</span>
          <span>Discount</span>
          <span>Subtotal</span>
          <span>Shipping</span>
        </div>
        <div className={`flex flex-col ${styles['item-end']}`}>
          <span>{calculatFormattedPrice(4599)}</span>
          <span>{calculatFormattedPrice(800)}</span>
          <span>{calculatFormattedPrice(3699)}</span>
          <span>To be calculated</span>
        </div>
      </div>
      <div className='mt-3 flex justify-between p-2 font-bold'>
        <span>To Pay</span>
        <span>{calculatFormattedPrice(3500)}</span>
      </div>
    </div>
  );
}

export default AmmountSummary;
