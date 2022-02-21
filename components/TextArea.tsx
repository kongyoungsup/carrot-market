import React from 'react'

interface props {
  title?: string;
  titleTrue?: boolean;
  row?: number;
  [key: string]: any;
}

export default function TextArea({title, titleTrue, row = 4, ...rest}: props) {
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
      />
    </div>
  )
}
