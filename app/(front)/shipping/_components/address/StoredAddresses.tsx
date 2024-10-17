'use client';
import React, { useState } from 'react';

import { useCheckout } from '@/components/contexts/CheckoutContext';

import AddressCard from './AddressCard';

const ADDRESSES = [
  {
    name: 'Muhammad Yameen',
    email: 'myameen960@gmail.com',
    address: 'Room 205, Ghazli hostel, Nust H12 Sector Islamabad, Pakistan',
    zip_code: '41000',
  },
  {
    name: 'Muhammad Yameen',
    email: 'myameen960@gmail.com',
    address:
      '24/345, Ali Khan Colony, Near Sector 32, Larkana, Sindh, Pakistan',
    zip_code: '21350',
  },
];

function StoredAddresses() {
  const { nextStep, prevStep } = useCheckout();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center'>
        <p>Hey! Welcome back +923103563314</p>
        <button className='rounded-full bg-slate-200 px-4 py-[2px] text-sm text-blue-900'>
          Edit
        </button>
      </div>
      {ADDRESSES.map((a) => (
        <AddressCard
          key={a.address}
          name={a.name}
          email={a.email}
          address={a.address}
          zip_code={a.zip_code}
          isSelected={selectedAddress === a.address}
          onSelect={() => handleAddressSelect(a.address)}
        />
      ))}
      <button
        className='btn btn-primary w-full'
        onClick={nextStep}
        disabled={!selectedAddress} // Disable if no address is selected
      >
        Continue
      </button>
      <button className='btn btn-primary w-full' onClick={prevStep}>
        Back
      </button>
    </div>
  );
}

export default StoredAddresses;
