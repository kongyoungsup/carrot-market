import { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/FloatingButton';
import Layout from '@components/Layout';


const Stream: NextPage = ()=>{
  return(
    <Layout title='홈' hasTabBar>
      <div className='px-4 py-10 divide-y-2'>
        {[1,2,3,5,6].map((data, i)=>(
        <div key={i} className='py-4 '>
          <div className='w-full bg-gray-300 aspect-video rounded-lg shadow-md' />
          <Link href={'/live/:id'}>
            <h3 className='font-medium text-gray-700 text-lg mt-2 cursor-pointer'>Let's try potatos</h3>
          </Link>
        </div>
        ))}
        <FloatingButton href="/live/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
      
    </Layout>
  )
}

export default Stream;