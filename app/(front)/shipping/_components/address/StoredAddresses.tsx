import React, { useState } from 'react';

import { useCheckout } from '@/components/contexts/CheckoutContext';

import AddressCard from './AddressCard';
import AddressForm from './addressForm';

// import AddressCard from './AddressCard';
// import AddressForm from './AddressForm';

const ADDRESSES = [
  {
    fullName: 'Muhammad Yameen',
    email: 'myameen960@gmail.com',
    address: 'Room 205, Ghazli hostel, Nust H12 Sector Islamabad, Pakistan',
    postalCode: '41000',
    city: 'Islamabad',
    country: 'pakistan',
  },
  {
    fullName: 'Muhammad Yameen',
    email: 'myameen960@gmail.com',
    address:
      '24/345, Ali Khan Colony, Near Sector 32, Larkana, Sindh, Pakistan',
    postalCode: '21350',
    city: 'Larkana',
    country: 'pakistan',
  },
];

function StoredAddresses() {
  const { nextStep, prevStep } = useCheckout();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<any | null>(null); // To store the address being edited

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address); // Pass the address being edited
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center'>
        <p>Hey! Welcome back +923103563314</p>
        <button className='rounded-full bg-slate-200 px-4 py-[2px] text-sm text-blue-900'>
          Edit
        </button>
      </div>
      {editingAddress ? (
        <AddressForm
          initialValues={editingAddress}
          onCancel={() => setEditingAddress(null)}
        />
      ) : (
        <>
          {ADDRESSES.map((a) => (
            <AddressCard
              key={a.address}
              fullName={a.fullName}
              email={a.email}
              address={a.address}
              postalCode={a.postalCode}
              isSelected={selectedAddress === a.address}
              onSelect={() => handleAddressSelect(a.address)}
              onEdit={() => handleEditAddress(a)} // Pass the address to the edit handler
            />
          ))}
          <button
            className='btn btn-primary w-full'
            onClick={nextStep}
            disabled={!selectedAddress}
          >
            Continue
          </button>
          <button className='btn btn-primary w-full' onClick={prevStep}>
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default StoredAddresses;
