import { NextPage } from 'next';
import React from 'react'
import type{ UseFormRegisterReturn } from 'react-hook-form';

interface inputProps {
  label: string;
  title: string;
  kind?: 'email' | 'text' | 'phone' | 'price' ;
  formReg: UseFormRegisterReturn;
  [key: string]: any;
}

export default function Input ({label, title, kind='text', formReg, ...rest}: inputProps) {
  return (
    <div>
      <label htmlFor={label} className='text-sm font-medium text-gray-500'>
          {title}
      </label>

      { kind === 'text' ?
        <div>
          <input 
            type='text'
            id={label} 
            {...rest}
            {...formReg} 
            className='mt-2 appearance-none w-full px-3 rounded-lg border-gray-400 first-line:shadow-md 
                     placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400'/> 
        </div>
      : null}

      { kind === 'price' ?
        <div className='flex items-center '>
          <div className='px-2 h-10 border border-r-0 flex items-center border-gray-400 rounded-l-lg'>
            <span>$</span>
          </div>
          <input 
            type='number' 
            id={label} 
            {...rest} 
            {...formReg} 
            className='w-full h-10 border-l-0 border-r-0 border-gray-400 focus:outline-none'   />
          <div className='px-2 h-10 border border-l-0 flex items-center border-gray-400 rounded-r-lg'>
            <span>USD</span>
          </div>
        </div>
      : null}

      { kind === 'email' ?
        <div className="space-y-1">
          <input
            type='email'
            id={label}    
            {...rest} 
            {...formReg} 
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      : null}

      { kind === 'phone' ?
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            type='number' 
            id={label} 
            {...formReg} 
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      : null}

    </div>
  )
}



{/* <label htmlFor='email' className='text-sm font-medium text-gray-500'>
{ method === "email" ? "Email addreass" : null }
{ method === "phone" ? "phone number" : null }
</label>

<div>
{ method === "email" ? (
<input 
type="email" id="email" required 
placeholder='e-mail...'
className='mt-2 appearance-none w-full px-3 rounded-lg border-gray-400 
            first-line:shadow-md placeholder-gray-400 focus:outline-none 
            focus:ring-orange-400 focus:border-orange-400'
/> 
) : null } 

{ method === "phone" ? (
<div className=' flex'>
<span   
  className='flex items-center mt-2 justify-center px-3 border border-r-0 
            border-gray-400 text-gray-400 rounded-l-lg select-none'>
  +82 
</span>
<input 
  className='mt-2 appearance-none w-full px-3 rounded-r-lg border-gray-400 
  first-line:shadow-md placeholder-gray-400 focus:outline-none border-l-0
  focus:ring-orange-400 focus:border-orange-400'
  type="number" required />
</div>
) : null}
</div> */}