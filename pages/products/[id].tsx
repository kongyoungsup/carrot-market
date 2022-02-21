import { NextPage } from 'next'
import { useState } from 'react'
import Button from '@components/Button';
import Layout from '@components/Layout';


const ItemDetail:NextPage = ()=> {
  return(
    <Layout canGoBack>
    <div>
      <div className=' p-4'>
        <div className=' w-full h-80 bg-gray-400' />
        <div className=' flex border-b  py-4 items-center'>
          <div className=' w-12 h-12 bg-gray-300 rounded-full' />
          <div className=' pl-3'>
            <p className=' font-bold text-sm '>Steve Jebs</p>
            <p className=' text-xs cursor-pointer hover:pl-1 transition'>View profile &rarr;</p>
          </div>
        </div>
        <div className=' mt-3'>
          <h1 className='text-2xl font-bold py-2'>Galaxy S50</h1>
          <span className='text-xl font-medium'>$140</span>
          <p className='mt-5'>
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
          <div className='flex space-x-3 items-center mt-3'>
            <Button title='Talk to seller'/>
            <button className=' p-3 hover:bg-gray-200 transition hover:rounded-md '>
              <svg
                className="h-6 w-6 text-center "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className=' px-4 mt-3'>
        <h2 className=' text-2xl font-bold mb-3'>Similar items</h2>
        <div className='grid grid-cols-2 gap-4' >
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i}>
              <div className=' aspect-square bg-gray-400 mb-2' />
              <h3 className='text-sm text-gray-700 cursor-pointer'>Galaxy S60</h3>
              <p className='text-xs'>$6</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>

  )
}

export default ItemDetail;