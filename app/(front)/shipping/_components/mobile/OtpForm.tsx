'use client';

import React, { useState } from 'react';

import { useCheckout } from '@/components/contexts/CheckoutContext';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const { nextStep, prevStep } = useCheckout();

  const verifyOtp = () => {
    if (otp.length === 4) {
      nextStep();
    } else {
      alert('Please enter a valid OTP');
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <input
        type='text'
        placeholder='Enter OTP'
        value={otp}
        className='input input-bordered w-full'
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className='btn btn-primary w-full' onClick={verifyOtp}>
        Verify OTP
      </button>
      <button className='btn btn-primary w-full' onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default OtpForm;
