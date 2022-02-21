import React from 'react'
import { cls } from '@libs/client/utils'

interface props {
  revers?: boolean;
  massage?: string;
}

export default function Message({revers, massage}: props) {
  return (
    <div className={cls(
      'flex items-start space-x-2',
      revers ?'flex-row-reverse space-x-reverse':"")}>
      <div className='w-10 h-10 bg-gray-400 rounded-full' />
      <div className='border-gray-400 border p-2 w-1/2 text-gray-700 rounded-lg'>
        <p>{massage}</p> 
      </div>
    </div>
  )
}
