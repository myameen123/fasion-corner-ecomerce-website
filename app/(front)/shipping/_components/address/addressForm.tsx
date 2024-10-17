import React, { useState } from 'react';

import { useCheckout } from '@/components/contexts/CheckoutContext';

const AddressForm = () => {
  const [newAddress, setNewAddress] = useState<string>('');
  const { nextStep, prevStep } = useCheckout();

  const submitNewAddress = () => {
    if (newAddress) {
      alert('Address saved');
      nextStep(); // Go to Payment after new address submission
    } else {
      alert('Please enter an address');
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <input
        type='text'
        placeholder='Enter your address'
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <button className='border' onClick={submitNewAddress}>
        Submit Address
      </button>
      <button className='border' onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default AddressForm;
