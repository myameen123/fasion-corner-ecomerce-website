/* eslint-disable import/order */
'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCustomer } from '@/components/contexts/CustomerContext';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import {  LockKeyhole, X } from 'lucide-react';
// import "./cardStyling.css"
// type CardFormValues = {
//   fullName: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// };

const DebitCardForm = () => {
  const { customer, setCustomer } = useCustomer();
  const { setButtonDisabled, setOnContinue, setIsLoading, goToSubStep } =
    useCheckout();

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: customer?.fullName || '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const fullName = watch('fullName');
  const cardNumber = watch('cardNumber');
  const expiryDate = watch('expiryDate');
  const cvc = watch('cvc');

  // Check if all required fields are filled and valid
  // Check if all required fields are filled and valid
useEffect(() => {
  const expiryParts = expiryDate.split('/');
  const month = parseInt(expiryParts[0], 10);

  const isFormValid =
    fullName.trim() !== '' &&
    /^[0-9]{16}$/.test(cardNumber) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate) &&
    /^[0-9]{3,4}$/.test(cvc) &&
    month >= 1 && month <= 12; // Ensuring month is between 1-12
  setButtonDisabled(!isFormValid);
}, [fullName, cardNumber, expiryDate, cvc, setButtonDisabled]);

const onSubmit = async (data) => {
  try {
    setIsLoading(true);
    const response = await fetch('/api/customer/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: customer.phoneNumber,
        cardDetails: data,
      }),
    });

    // Extract JSON response
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to save card details.');
    }

    // Update the customer context
    setCustomer(result.data);
    toast.success('Card details added successfully!');
    goToSubStep(2, 1);
  } catch (error) {
    console.error('Error adding card details:', error);
    toast.error(error.message); // Display backend error message in toast
  } finally {
    setIsLoading(false);
  }
};


  // useEffect(() => {
  //   setOnContinue(() => handleSubmit(onSubmit));
  //   setIsLoading(false);
  // }, [setOnContinue, handleSubmit, setIsLoading]);
  useEffect(() => {
    setOnContinue(() => () => handleSubmit(onSubmit)());
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOnContinue, handleSubmit, setIsLoading]);
  return (
    <div className='mt-4 bg-white rounded-xl p-4'>
      <div className='flex items-start justify-between px-2'>
        <div>
          <p className='mb-1 font-medium'>Add New Card</p>
          <div className=' flex items-center justify-center gap-1 font-bold'>
            <LockKeyhole size={11} strokeWidth={3} />
            <p className='text-xs'>We will securely save your card details</p>
          </div>
        </div>
        <button className='cursor-pointer cross-btn' onClick={()=>goToSubStep(2, 1)}>
          <X className='m-1' />
        </button>
     
    
      </div>
      <form className=''>
        {/* Full Name Field */}
        <div className="mt-4">
        <label className="text-gray-500 text-sm">Full Name</label>
        <input
          type="text"
          // value="BHARTI None"
          // readOnly
          className="w-full mt-1 p-2 border rounded-md bg-white text-gray-700"
          id='fullName'
          {...register('fullName', {
            required: 'Full name is required',
          })}
        />
        {errors.fullName && (
          <p className='mt-1 text-sm text-red-500'>
            {errors.fullName.message}
          </p>
        )}
      </div>
        {/* <div className='mb-4'>
          <TextField
            label='Full Name'
            variant='outlined'
            required
            fullWidth
            id='fullName'
            {...register('fullName', {
              required: 'Full name is required',
            })}
          />
          {errors.fullName && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.fullName.message}
            </p>
          )}
        </div> */}

        {/* Card Number Field */}
        <div className="mt-4">
        <label className="text-gray-500 text-sm">Card Number</label>
        <input
          type="number"
          placeholder="XXXX XXXX XXXX XXXX"
          // value={cardNumber}
          // onChange={(e) => setCardNumber(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md bg-white appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id='cardNumber'
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'Card number must be 16 digits',
              },
            })}
          />
          {errors.cardNumber && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.cardNumber.message}
            </p>
          )}
      </div>
        {/* <div className='mb-4'>
          <TextField
            label='Card Number'
            variant='outlined'
            required
            fullWidth
            id='cardNumber'
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'Card number must be 16 digits',
              },
            })}
          />
          {errors.cardNumber && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.cardNumber.message}
            </p>
          )}
        </div> */}
              <div className="flex mt-4 gap-2">
        <div className="w-1/2">
          <label className="text-gray-500 text-sm">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            // value={expiryDate}
            // onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md bg-white"
            id='expiryDate'
            {...register('expiryDate', {
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Expiry date must be in MM/YY format',
              },
            })}
          />
          {errors.expiryDate && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.expiryDate.message}
            </p>
          )}
        </div>
        <div className="w-1/2 relative">
          <label className="text-gray-500 text-sm">Enter CVV</label>
          <div className="relative">
            <input
              type='password'
              placeholder="CVV"
              // value={cvv}
              // onChange={(e) => setCvv(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md pr-10 bg-white"
              id='cvc'
              {...register('cvc', {
                required: 'CVC is required',
                maxLength:3,
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: 'CVC must be 3 or 4 digits',
                },
              })}
            />
            {errors.cvc && (
              <p className='mt-1 text-sm text-red-500'>{errors.cvc.message}</p>
            )}
            {/* <button
              type="button"
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowCvv(!showCvv)}
            >
              <Eye size={16} />
            </button> */}
          </div>
        </div>
      </div>
        
      </form>
    </div>
  );
};

export default DebitCardForm;


{/* //   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
//       <h2 className="text-lg font-semibold">Add new card</h2>
//       <p className="flex items-center text-gray-500 text-sm mt-1">
//         <Lock size={14} className="mr-1" /> We will securely save your card details
//       </p>

      // <div className="mt-4">
      //   <label className="text-gray-500 text-sm">Full Name</label>
      //   <input
      //     type="text"
      //     value="BHARTI None"
      //     readOnly
      //     className="w-full mt-1 p-2 border rounded-md bg-white text-gray-700"
      //   />
      // </div>

      <div className="mt-4">
        <label className="text-gray-500 text-sm">Card Number</label>
        <input
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md bg-white"
        />
      </div>

      <div className="flex mt-4 gap-2">
        <div className="w-1/2">
          <label className="text-gray-500 text-sm">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="w-1/2 relative">
          <label className="text-gray-500 text-sm">Enter CVV</label>
          <div className="relative">
            <input
              type={showCvv ? 'text' : 'password'}
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md pr-10"
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowCvv(!showCvv)}
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>
//     </div>
//   );
// } */}
