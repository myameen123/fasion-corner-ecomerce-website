import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import './cardStyling.css';
const PaymentMethod = ({
  type,
  price,
  methods,
  isDiscount,
  isExtra,
  discount,
  extraCharges,
  onClick,
  //   onSelect,
}) => {
  const formattedPrice = price.toLocaleString('en-PK', {
    style: 'currency',
    currency: 'PKR',
  });
  return (
    <div
      className={` paymentCard card mb-4 cursor-pointer flex-row justify-between p-4 text-white shadow-inner `}
      onClick={onClick}
    >
      <div className='w-full'>
        {/* <div className='flex items-center gap-3'>
          {isDiscount && !isExtra && (
            <p className=' max-w-fit rounded-full border border-green-800 bg-green-300 px-2 text-xs text-green-800'>
              Extra {discount}% Discount
            </p>
          )}
          {!isDiscount && isExtra && (
            <p className=' max-w-fit rounded-full border border-red-800 bg-red-200 px-2 text-xs text-red-800'>
              RS {extraCharges} COD fee added
            </p>
          )}
        </div> */}
        <div className='flex justify-between'>
          <div className=' flex flex-col gap-1'>
            <span className=''>{type}</span>
            <div className=' flex gap-1 text-xs'>
              {methods.map((m) => (
                <span key={m.id}>{m.name}</span>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-center  gap-1'></div>
        </div>
      </div>
      <div className=' flex items-center justify-center'>
        <span>{formattedPrice}</span>
        <ChevronRight />
      </div>
    </div>
  );
};

export default PaymentMethod;