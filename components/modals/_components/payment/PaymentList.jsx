/* eslint-disable import/order */
'use client';
import React, { useEffect } from 'react';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import { useCustomer } from '@/components/contexts/CustomerContext';
import DeliveryCard from './DeliveryCard';

import PaymentMethod from './PaymentMethod';

// import PaymentMethodCard from './PaymentMethod';

const PaymentMethods = [
  {
    id: '1',
    type: 'Dabit/Credit Cards',
    price: 3699,
    isExtra: false,
    isDiscount: true,
    message:"Extra 15% discount + cashback",
    discount: 15,
    extraCharges: 0,

    methods: [
      {
        id: 'e',
        name: 'Mastercard',
      },
      {
        id: 'd',
        name: 'visa',
      },
    ],
  },
  {
    id: '2',
    type: 'Wallets',
    price: 3750,
    message:"Get cashback",
    isDiscount: true,
    discount: 15,
    isExtra: false,
    extraCharges: 0,

    methods: [
      {
        id: 'a',
        name: 'Easypaisa',
      },
      {
        id: 'b',
        name: 'Jazzcash',
      },
    ],
  },
  {
    id: '3',
    type: 'Cash On Delivery',
    price: 4005,
    isExtra: true,
    message:"Rs 200 COD fee added",
    isDiscount: false,
    discount: 0,
    extraCharges: 200,

    methods: [
      {
        id: 'c',
        name: 'Additional fee charged for delivery',
      },
    ],
  },
];

function PaymentList() {
  const {
    setButtonDisabled,
    setOnContinue,
    goToStep,
    goToSubStep,
    setIsLoading,
    setAddressIdToEdit,
  } = useCheckout();
  const { customer } = useCustomer();

  useEffect(() => {
    setButtonDisabled(true); // Disable the button initially
    setOnContinue(() => () => {}); // Set an empty onContinue function
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array
  useEffect(() => {
    if (!customer) {
      goToStep(0);
    }
  }, [customer, goToStep]);

  const onEdit = () => {
    goToStep(0);
  };
  const handleEditAddress = (addressId) => {
    setAddressIdToEdit(addressId);
    goToSubStep(1, 2);
  };
  const handlePaymentClick = (paymentId) => {
    if (paymentId === '1') {
      goToSubStep(2, 1);
    } else if (paymentId === '2') {
      goToSubStep(2, 2);
    } else if (paymentId === '3') {
      customer.status==="low"? goToStep(3): goToSubStep(2, 3)
     
    }
  };

  const selectedAddress =
    customer.addresses.find((address) => address.isSelected) || {};

  return (
    <div className='mt-4 flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <p className=' text-sm'>Hey! Welcome back +92{customer.phoneNumber}</p>
        <button
          onClick={onEdit}
          className='rounded-full bg-slate-200 px-3 py-[2px] text-xs text-blue-900'
        >
          Edit
        </button>
      </div>
      <DeliveryCard
        id={selectedAddress._id}
        fullName={selectedAddress.fullName}
        address={selectedAddress.fullAddress}
        email={selectedAddress.email}
        postalCode={selectedAddress.postalCode}
        city={selectedAddress.city}
        state={selectedAddress.state}
        isSelected={selectedAddress.isSelected}
        onEdit={() => handleEditAddress(selectedAddress._id)}
      />
      <div>
        <p className='mb-2'>Payment Options</p>
        {PaymentMethods.map((p) => (
          <PaymentMethod
            key={p.id}
            type={p.type}
            price={p.price}
            methods={p.methods}
            id ={p.id}
            isDiscount={p.isDiscount}
            isExtra={p.isExtra}
            discount={p.discount}
            message = {p.message}
            extraCharges={p.extraCharges}
            onClick={() => handlePaymentClick(p.id)}
          />
        ))}
      </div>
      {/* <CardModel onClose={onClose} open={openModal} /> */}
    </div>
  );
}

export default PaymentList;
