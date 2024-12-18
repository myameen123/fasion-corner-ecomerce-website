import Image from 'next/image';
import React from 'react';

function ProductInfo() {
  const price = 5000;
  const formattedPrice = price.toLocaleString('en-PK', {
    style: 'currency',
    currency: 'PKR',
  });
  return (
    <div className=' my-4 flex items-center gap-2 border-b p-2'>
      <div>
        <Image src='/images/shirt.png' alt='shirt' width={220} height={220} />
      </div>
      <div className=' flex-col gap-1 text-sm '>
        <div className=' flex gap-2'>
          <p>
            Simple yet striking, this black T-shirt is a wardrobe staple,
            featuring a modern cut and super-soft fabric <span>- Black</span>
          </p>
        </div>
        <div className=' flex gap-1'>
          <span>Price:</span>
          <span className='line-through'>{formattedPrice}</span>
          {/* <span>discount</span>s */}
        </div>
        <div>
          <span>Quantity: </span>
          <span>3</span>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
