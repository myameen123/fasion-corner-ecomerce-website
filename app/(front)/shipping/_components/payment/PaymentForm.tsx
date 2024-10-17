import React from 'react';

import { useCheckout } from '@/components/contexts/CheckoutContext';

const PaymentForm = () => {
  const { prevStep } = useCheckout();
  const placeOrder = () => {
    alert('Order Placed Successfully!');
  };

  return (
    <div className='flex flex-col gap-3'>
      <p>Select Payment Method</p>
      <button className='border' onClick={placeOrder}>
        Place Order
      </button>
      <button className='border' onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default PaymentForm;
