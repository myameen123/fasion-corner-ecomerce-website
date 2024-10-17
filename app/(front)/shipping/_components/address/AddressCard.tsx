import React from 'react';

type AddressCardProps = {
  name: string;
  email: string;
  address: string;
  zip_code: string;
  isSelected: boolean;
  onSelect: () => void;
};

function AddressCard({
  name,
  email,
  address,
  zip_code,
  isSelected,
  onSelect,
}: AddressCardProps) {
  return (
    <label className='card flex w-full cursor-pointer flex-row items-start border bg-white p-4 text-sm shadow-xl'>
      <input
        className='mr-3 mt-1'
        type='radio'
        name='address'
        checked={isSelected}
        onChange={onSelect}
      />
      <div>
        <p>
          <strong>{name}</strong>
        </p>
        <p className=' w-fit rounded-full bg-slate-100 px-4 py-[2px] text-[10px] font-bold'>
          {email}
        </p>
        <p className=' text-xs'>
          {address} {zip_code}
        </p>
      </div>
    </label>
  );
}

export default AddressCard;
