/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  FormEvent,
  startTransition,
  useEffect,
  useState,
  useTransition,
} from 'react';

import { auth } from '@/firebase';
import {
  ConfirmationResult,
  RecaptchaParameters,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

import { useRouter } from 'next/navigation';
import { useCheckout } from '@/components/contexts/CheckoutContext';
import PhoneNumberInput from '@/components/inputs/PhoneNumberInput';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const PhoneForm = () => {
  const {
    setOnContinue,
    nextSubStep,
    setButtonDisabled,
    setMobile,
    confirmationResult,
    setConfirmationResult,
    isLoading,
    setIsLoading,
  } = useCheckout();
  const [phoneNumber, setPhoneNumber] = useState(''); // State to hold mobile number
  const [isValid, setIsValid] = useState(false); // State to track validation
  const [notify, setNotify] = useState(true); // State to track checkbox

  // const [confirmationResult, setConfirmationResult] =
  //   useState<ConfirmationResult | null>();

  // const [isPending, setIsLoading] = useState(false);
  // const [isPending, setIsLoading] = useTransition();

  const [recaptchaVerifier, setrecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    setButtonDisabled(true); // Disable the button initially
    setOnContinue(() => () => {}); // Set an empty onContinue function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array

  useEffect(() => {
    setButtonDisabled(!isValid); // Enable button when valid
  }, [isValid]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'receptcha-container',
      {
        size: 'invisible',
      },
    );
    setrecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  useEffect(() => {
    if (isValid) {
      setOnContinue(() => requestOtp);
      requestOtp();
    }
  }, [isValid]); // Depend on the function state

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);

    startTransition(async () => {
      try {
        setTimeout(() => {
          setIsLoading(false); // Set loading state to false after 4 seconds
          setMobile(phoneNumber);
          toast.success('OTP sent successfully.');
          nextSubStep(); // Move to the next sub-step on success
        }, 2000);
      } catch (err: any) {
        setIsLoading(false);
        console.log(err);

        if (err.code === 'auth/invalid-phone-number') {
          toast.error('Invalid phone number. Please check the number.');
        } else if (err.code === 'auth/too-many-requests') {
          toast.error('Too many requests. Please try again later.');
        } else {
          toast.error('Failed to send OTP. Please try again.');
        }
      }
    });
  };

  return (
    <div className='mt-4 flex flex-col items-center gap-4'>
      <p className=' text-lg text-blue-950'>Enter Mobile Number</p>

      {!confirmationResult && (
        <>
          <PhoneNumberInput
            value={phoneNumber}
            onChange={setPhoneNumber} // Update the mobile state
            onValidation={setIsValid} // Track validation status
            required
          />

          {/* Checkbox Component */}
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='notify'
              name='notify'
              checked={notify}
              onChange={() => setNotify(!notify)} // Toggle the notify state
              className='checkbox'
            />
            <label htmlFor='notify' className='cursor-pointer'>
              Notify me for orders, updates & offers
            </label>
          </div>
        </>
      )}

      <style jsx>{`
        .checkbox {
          width: 15px;
          height: 15px;
          position: relative;
          cursor: pointer;
          appearance: none;
          border: 2px solid black;
          border-radius: 4px;
          background-color: white;
        }

        .checkbox::before {
          content: ''; /* Create the outer layer */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          border-radius: 4px;
          background-color: white;
          z-index: 1;
        }

        .checkbox::after {
          content: '✔'; /* Add the checkmark */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10px;
          color: white;
          visibility: hidden;
          z-index: 2;
        }

        .checkbox:checked::before {
          background-color: black; /* Change the background when checked */
        }

        .checkbox:checked::after {
          visibility: visible; /* Show the checkmark when checked */
        }
      `}</style>

      <div id='receptcha-container' />
    </div>
  );
};

export default PhoneForm;
