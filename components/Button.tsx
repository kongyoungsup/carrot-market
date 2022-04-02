import React from 'react'

interface props{
  title: string;
  onClick?: any;
}

export default function Button({title, onClick}: props) {
  return (
      <button onClick={onClick} className='block w-full bg-orange-500 text-white px-2 py-4 rounded-lg border-transparent
                             shadow-md text-sm font-medium 
                             focus: ring-offset-2 focus: ring-orange-400 focus:ring-2 focus:outline-none'>
        {title}
      </button>
  )
}
