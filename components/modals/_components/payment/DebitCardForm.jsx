/* eslint-disable import/order */
'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCustomer } from '@/components/contexts/CustomerContext';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import { LockKeyhole } from 'lucide-react';

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
  useEffect(() => {
    const isFormValid =
      fullName.trim() !== '' &&
      /^[0-9]{16}$/.test(cardNumber) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate) &&
      /^[0-9]{3,4}$/.test(cvc);

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

      if (!response.ok) {
        throw new Error('Failed to save card details.');
      }
      const updatedCustomer = await response.json();
      // Update the customer context
      setCustomer(updatedCustomer.data);
      toast.success('Card details added successfully!');
      goToSubStep(2, 1);
    } catch (error) {
      console.error('Error adding card details:', error);
      toast.error('Failed to add card details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOnContinue(() => handleSubmit(onSubmit));
    setIsLoading(false);
  }, [setOnContinue, handleSubmit, setIsLoading]);

  return (
    <div className='mt-4'>
      <div className='flex items-start justify-between px-2'>
        <div>
          <p className='mb-1 font-medium'>Add New Card</p>
          <div className=' flex items-center justify-center gap-1 font-bold'>
            <LockKeyhole size={11} strokeWidth={3} />
            <p className='text-xs'>We will securely save your card details</p>
          </div>
        </div>
        <p className='text-xs'>* Mandatory Fields</p>
      </div>
      <form className='p-4'>
        {/* Full Name Field */}
        <div className='mb-4'>
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
        </div>

        {/* Card Number Field */}
        <div className='mb-4'>
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
        </div>
        <div className='flex gap-4'>
          {/* Expiry Date Field */}
          <div className='mb-4'>
            <TextField
              label='Expiry Date'
              variant='outlined'
              required
              fullWidth
              id='expiryDate'
              placeholder='MM/YY'
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

          {/* CVV Field */}
          <div className='mb-4'>
            <TextField
              label='CVC'
              variant='outlined'
              required
              fullWidth
              id='cvc'
              type='password'
              {...register('cvc', {
                required: 'CVC is required',
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: 'CVC must be 3 or 4 digits',
                },
              })}
            />
            {errors.cvc && (
              <p className='mt-1 text-sm text-red-500'>{errors.cvc.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DebitCardForm;
