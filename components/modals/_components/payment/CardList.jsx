/* eslint-disable import/order */
import React from 'react';
import DeliveryTime from './DeliveryTime';
import { MoveLeft, Plus } from 'lucide-react';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import { useCustomer } from '@/components/contexts/CustomerContext';
import CreditCard from "./creditCard"
import toast from 'react-hot-toast';
import Image from 'next/image';
function CardList() {
  const {
    setButtonDisabled,
    setOnContinue,
    goToStep,
    goToSubStep,
    setIsLoading,
  } = useCheckout();
  const { customer, setCustomer } = useCustomer();
  const onLeft = () => {
    goToStep(2);
  };
  const onAddCard = () => {
    goToSubStep(2, 2);
  };
  const debitCreditCards = customer?.paymentMethods?.filter(
    (method) => method.type === 'debit/credit card'
  ) || [];

  const handleCardSelect = async (id) => {
    if (!customer || !customer.phoneNumber) {
      toast.error('Customer information is missing.');
      return;
    }
    const selectedMethod = customer.paymentMethods?.find(
      (method) => method._id === id && method.isSelected
    );
  
    if (selectedMethod) {
      goToSubStep(2,1)
      return
    }    
    try {
      setIsLoading(true);

  
      const response = await fetch('/api/customer/card', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: customer.phoneNumber,
          paymentMethodId: id, // ID of the selected payment method
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update payment method.');
      }
  
      const updatedCustomer = await response.json();
  
      // Update customer data in the context
      setCustomer(updatedCustomer.data);
      goToSubStep(2,1)
      // toast.success('Payment method updated successfully!');
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error('Failed to update payment method. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className='card flex mt-4 flex-col gap-3 '>
      <DeliveryTime />
      <div className='flex  flex-col'>

      {debitCreditCards.length > 0 && (
        debitCreditCards.map((card) => (
          <CreditCard key={card._id} card={card} onSelect={() => handleCardSelect(card._id)}/>
          
        ))
      )}
      </div>

      <div className='flex cursor-pointer items-center gap-2' onClick={onAddCard}>
        <span className='rounded-md border p-1'>
          <Plus />
        </span>
        <p>Add Card</p>
      </div>
    </div>
  );
}

export default CardList;
