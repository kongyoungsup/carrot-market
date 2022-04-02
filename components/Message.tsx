import React from 'react'
import { cls } from '@libs/client/utils'
import Image from 'next/image'

interface props {
  revers?: boolean;
  massage?: string;
  src?: any;
  height?: number;
  width?: number
}

export default function Message({revers, massage, src }: props) {
  return (
    <div className={cls(
      'flex items-start space-x-2',
      revers ?'flex-row-reverse space-x-reverse':"")}>
      <Image src={src} height={48} width={48} className='bg-gray-400 rounded-full object-cover' />
      <div className='border-gray-400 border p-2 w-1/2 text-gray-700 rounded-lg'>
        <p>{massage}</p> 
      </div>
    </div>
  )
}
