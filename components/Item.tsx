import Link from 'next/link'
import React from 'react'

interface ItemProps {
  title: string;
  id: number;
  price: number;
  comments?: number;
  hearts: number;
}

export default function Item({
  title,
  id,
  price,
  comments,
  hearts
}: ItemProps) {
  return (
    <div className='flex justify-between p-5 border-b-2'>
          <div className=' flex items-center '>
            <div className='w-24 h-24 bg-slate-400 rounded-md' />
            <div className=' flex flex-col pl-4'>
              <Link href={`/products/${id}`}>
              <h3 className=' cursor-pointer'>{title}</h3>
              </Link>
              {/* <span className=' text-sm text-gray-500'>Black</span> */}
              <span className=' text-md mt-2 font-medium'>$ {price}</span>
            </div>
          </div>

          <div className='flex items-end space-x-2 text-gray-500 '>
            <div className='flex space-x-0.5 items-center '>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{hearts}</span>
            </div>
            <div className='flex space-x-0.5 items-center '>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{comments}</span>
            </div>
          </div>
          
        </div>
  )
}
