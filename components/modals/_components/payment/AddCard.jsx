import React from 'react';
import DeliveryTime from './DeliveryTime';
import { MoveLeft, Plus } from 'lucide-react';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import { useCustomer } from '@/components/contexts/CustomerContext';
import Image from 'next/image';
function AddCard() {
  const {
    setButtonDisabled,
    setOnContinue,
    goToStep,
    goToSubStep,
    setIsLoading,
  } = useCheckout();
  const { customer } = useCustomer();
  const onLeft = () => {
    goToStep(2);
  };
  const onAddCard = () => {
    goToSubStep(2, 2);
  };
  const getCardLast4Digits = () => {
    if (
      customer?.paymentMethods &&
      customer.paymentMethods[0]?.cardDetails?.cardNumber
    ) {
      const cardNumber = customer.paymentMethods[0].cardDetails.cardNumber;
      return cardNumber.slice(-4); // Get last 4 digits
    }
    return ''; // Return empty string if no card number exists
  };
  return (
    <div className='flec mt-4 flex-col gap-3'>
      <DeliveryTime />
      <button className='my-4 flex gap-4' onClick={onLeft}>
        <MoveLeft />
        <span>Credit/Debit Cards</span>
      </button>
      {customer?.paymentMethods && customer.paymentMethods.length > 0 && (
        <div className=' mb-4 flex w-full cursor-pointer justify-between border p-2'>
          <div className='flex items-center gap-4'>
            <Image
              src='/images/masterCard.png'
              className=' rounded-md border px-4 py-1'
              alt='logo'
              width={60}
              height={60}
            />
            {/* Mastercard with 4 dots and last 4 digits */}
            <p className=' text-xs'>
              Mastercard &#8226;&#8226;&#8226;&#8226; {getCardLast4Digits()}
            </p>
          </div>
          <button className='mr-1 text-blue-600'>Change</button>
        </div>
      )}
      <div
        className='flex cursor-pointer items-center gap-2 '
        onClick={onAddCard}
      >
        <span className='rounded-md border p-1'>
          <Plus />
        </span>
        <p>Add Card</p>
      </div>
    </div>
  );
}

export default AddCard;
