import React from 'react';

interface FormFieldProps {
  id: string;
  content: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ id , content, value,  onChange, type="text", placeholder }) => {
  return (
    <div className="w-full">
            <label htmlFor={id} className="relative bg-white pr-2 left-2.5 top-1.5 text-[#D9D9D9]">
              {content}
            </label>
            <input 
            type={type}
            value={value}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChange}
            placeholder={placeholder}
            />
    </div>
  )
}

export default FormField