import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface props {
  title?: string;
  titleTrue?: boolean;
  row?: number;
  formReg?: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({title, titleTrue, row = 4, formReg, ...rest}: props) {
  return (
    <div>
    { titleTrue ? 
      <label htmlFor='textarea' className='flex mb-2'>{title}</label>
      : null
    }
    <textarea 
        className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
        rows={row}
        {...rest}
        {...formReg} 
      />
    </div>
  )
}
