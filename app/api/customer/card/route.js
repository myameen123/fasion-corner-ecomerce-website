/* eslint-disable import/order */
import { NextResponse } from 'next/server';
import CustomerModel from '@/lib/models/CustomerModel';
import dbConnect from '@/lib/dbConnect';

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { phoneNumber, cardDetails } = await req.json();
    console.log(cardDetails);

    if (!phoneNumber || !cardDetails) {
      return NextResponse.json(
        { message: 'Phone number and card details are required.' },
        { status: 400 },
      );
    }

    // Find the customer by phone number
    const customer = await CustomerModel.findOne({ phoneNumber });

    if (!customer) {
      return NextResponse.json(
        { message: 'Customer not found.' },
        { status: 404 },
      );
    }

    // // Validate if card number already exists for the customer
    // const existingCard = customer.paymentMethods.find(
    //   (method) =>
    //     method.type === 'debit/credit card' &&
    //     method.cardDetails?.cardNumber === cardDetails.cardNumber,
    // );

    // if (existingCard) {
    //   return NextResponse.json(
    //     { message: 'Card already exists.' },
    //     { status: 400 },
    //   );
    // }

    // Add the new card details to paymentMethods
    customer.paymentMethods.push({
      type: 'debit/credit card',
      cardDetails: {
        fullName: cardDetails.fullName,
        cardNumber: cardDetails.cardNumber,
        expiryDate: cardDetails.expiryDate,
        cvc: cardDetails.cvc,
      },
    });

    // Save the updated customer
    await customer.save();

    return NextResponse.json(
      { message: 'Card details added successfully.', data: customer },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in adding card details:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 },
    );
  }
}
