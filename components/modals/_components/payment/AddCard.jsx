/* eslint-disable import/order */
"use client"
import React, { useEffect } from 'react';
import DeliveryTime from './DeliveryTime';
import { MoveLeft, Plus } from 'lucide-react';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import { useCustomer } from '@/components/contexts/CustomerContext';
import CreditCard from "./creditCard"
import toast from 'react-hot-toast';
import Image from 'next/image';
function AddCard() {
  const {
    setButtonDisabled,
    setOnContinue,
    goToStep,
    goToSubStep,
    setIsLoading,
  } = useCheckout();
  const { customer, setCustomer } = useCustomer();
   useEffect(() => {
      setButtonDisabled(true); // Disable the button initially
      setOnContinue(() => () => {}); // Set an empty onContinue function
      setIsLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array
   

  const onLeft = () => {
    goToStep(2);
  };
  const onAddCard = () => {
    goToSubStep(2, 2);
  };
  const debitCreditCards = customer?.paymentMethods?.filter(
    (method) => method.type === 'debit/credit card'
  ) || [];

  useEffect(() => {
    if(debitCreditCards.length>0){
      setButtonDisabled(false)
      setOnContinue(() => () => handlePayment());
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOnContinue,  setIsLoading]);
  const onChangeCard = ()=>{
    goToSubStep(2, 4);
  }
  const selectedMethod = customer.paymentMethods?.find(
    (method) =>  method.isSelected
  );
  const handlePayment = ()=>{
    console.log("paymentt.....",selectedMethod.cardDetails
    )
  }
  return (
    <div className='flec mt-4 flex-col gap-3'>
      <DeliveryTime />
      <button className='my-4 flex gap-4' onClick={onLeft}>
        <MoveLeft />
        <span>Credit/Debit Cards</span>
      </button>
      {/* {debitCreditCards.length > 0 && (
        debitCreditCards.map((card) => (
          <CreditCard key={card._id} card={card} onSelect={() => handleCardSelect(card._id)}/>
          
        ))
      )} */}
      {debitCreditCards.length>0? (
        <div className={`mb-4 h-12  flex w-full justify-between border  p-4  flex-row items-center bg-white  text-sm border-black debit-card rounded-md`}>
          <div className='flex items-center gap-4 w-full'>
                <Image
                  src={`${selectedMethod.cardDetails.cardType==="Visa"?"/visa.svg":"/master_card.svg"}`}
                  className=''
                  alt='logo'
                  width={60}
                  height={60}
                />
                <p className=' w-full   '>
                  {selectedMethod.cardDetails.cardType || 'Card'} &#8226;&#8226;&#8226;&#8226;  {selectedMethod.cardDetails?.cardNumber?.slice(-4)}
                </p>
              </div>
              <button className='font-semibold' onClick={onChangeCard}>Change</button>
        </div>
      ):
      (
        <div className='flex cursor-pointer items-center gap-2' onClick={onAddCard}>
        <span className='rounded-md border p-1'>
          <Plus />
        </span>
        <p>Add Card</p>
      </div>)}
      
    </div>
  );
}

export default AddCard;
