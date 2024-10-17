import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import Image from 'next/image';
import React, { useState, useEffect, FocusEvent, ChangeEvent } from 'react';

type PhoneNumberInputProps = {
  onChange: (value: string) => void;
  onValidation?: (isValid: boolean) => void;
  value: string;
  required?: boolean;
  disabled?: boolean;
};

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChange,
  onValidation,
  value,
  required = false,
  disabled,
}) => {
  const defaultCountry = 'PK'; // Fixed to Pakistani numbers
  const countryCode = '92'; // Pakistan country code
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [isTouched, setTouched] = useState(false); // Track if the input has been touched (focused and blurred)
  const [displayValue, setDisplayValue] = useState(value || '');

  // Helper function to parse the phone number
  const PhoneNumber = (v = value) => {
    try {
      return parsePhoneNumber(v || '', defaultCountry);
    } catch (error) {
      return null;
    }
  };

  // Handle validation when value changes, but only show error if the input is touched
  useEffect(() => {
    const isValid = isValidPhoneNumber(value || '', defaultCountry);
    if (onValidation) {
      onValidation(isValid);
    }

    if (isTouched) {
      if (required && !value) {
        setError(true);
        setHelperText('This field is required');
      } else if (!isValid && value) {
        setError(true);
        setHelperText('Invalid phone number');
      } else {
        setError(false);
        setHelperText('');
      }
    }
  }, [value, required, isTouched, onValidation]);

  // Handle formatting and validation on blur
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setTouched(true); // Mark the input as touched when blurred
    const phoneNumber = PhoneNumber(displayValue);
    if (phoneNumber) {
      setDisplayValue(phoneNumber.formatNational());
      onChange(phoneNumber.format('E.164')); // Pass formatted number in E.164 format to parent
    }
  };

  // Update the state value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
    onChange(e.target.value); // Trigger parent's onChange
  };

  return (
    <div className='form-control w-full'>
      <div className='flex gap-2'>
        <button type='button' className='btn gap-0 border p-2' disabled>
          <Image
            width={20}
            height={20}
            src={`https://flagcdn.com/w20/pk.png`}
            alt='Pakistan Flag'
          />
          &nbsp;+{countryCode}
        </button>
        <input
          type='text'
          placeholder='03105689647'
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
          value={displayValue}
          onFocus={() => setFocused(true)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
      {isTouched && helperText && (
        <span className='text-sm text-red-500'>{helperText}</span>
      )}
    </div>
  );
};

export default PhoneNumberInput;

// import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
// import Image from 'next/image';
// import React, { useState, useEffect, FocusEvent, ChangeEvent } from 'react';

// type PhoneNumberInputProps = {
//   onChange: (value: string) => void;
//   onValidation?: (isValid: boolean) => void;
//   value: string;
//   required?: boolean;
//   disabled?: boolean;
// };

// const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
//   onChange,
//   onValidation,
//   value,
//   required = false,
//   disabled,
// }) => {
//   const defaultCountry = 'PK'; // Fixed to Pakistani numbers
//   const countryCode = '92'; // Pakistan country code
//   const [error, setError] = useState(false);
//   const [helperText, setHelperText] = useState('');
//   const [isFocused, setFocused] = useState(false);
//   const [displayValue, setDisplayValue] = useState(value || '');

//   // Helper function to parse the phone number
//   const PhoneNumber = (v = value) => {
//     try {
//       return parsePhoneNumber(v || '', defaultCountry);
//     } catch (error) {
//       return null;
//     }
//   };

//   // Handle validation when value changes
//   useEffect(() => {
//     const isValid = isValidPhoneNumber(value || '', defaultCountry);
//     if (onValidation) {
//       onValidation(isValid);
//     }

//     if (required && !value) {
//       setError(true);
//       setHelperText('This field is required');
//     } else if (!isValid && value) {
//       setError(true);
//       setHelperText('Invalid phone number');
//     } else {
//       setError(false);
//       setHelperText('');
//     }
//   }, [value, required, onValidation]);

//   // Handle formatting on blur
//   const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
//     setFocused(false);
//     const phoneNumber = PhoneNumber(displayValue);
//     if (phoneNumber) {
//       setDisplayValue(phoneNumber.formatNational());
//       onChange(phoneNumber.format('E.164')); // Pass formatted number in E.164 format to parent
//     }
//   };

//   // Update the state value
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setDisplayValue(e.target.value);
//     onChange(e.target.value); // Trigger parent's onChange
//   };

//   return (
//     <div className='form-control w-full'>
//       <div className='flex gap-2'>
//         <button type='button' className='btn gap-0 p-2' disabled>
//           <Image
//             width={20}
//             height={20}
//             src={`https://flagcdn.com/w20/pk.png`}
//             alt='Pakistan Flag'
//           />
//           &nbsp;+{countryCode}
//         </button>
//         <input
//           type='text'
//           placeholder='03105689647'
//           className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
//           value={displayValue}
//           onFocus={() => setFocused(true)}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           disabled={disabled}
//         />
//       </div>
//       {helperText && <span className='text-sm text-red-500'>{helperText}</span>}
//     </div>
//   );
// };

// export default PhoneNumberInput;
