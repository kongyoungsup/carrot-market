import { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';


const StreamDetail: NextPage = ()=>{
  return(
    <Layout canGoBack >
    <div className='px-4 py-10'>

      <div className='py-4 '>
        <div className='w-full bg-gray-300 aspect-video rounded-lg shadow-md' />
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
      </div>
      <div className='py-4 '>
        <h3 className='font-semibold text-gray-800 text-2xl mt-2 py-2'>Live Chat</h3>
      </div>
      <div className='py-5 px-4 pb-16 space-y-6 h-[50vh] overflow-scroll'>
        <Message massage='존나재밋네' />
        <Message massage='ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ' revers />
        <Message massage='핵잼' />
      </div>

      <div className='fixed bottom-5 mx-auto max-w-md inset-x-0'>
        <div className='flex relative items-center '>
          <input className='w-full rounded-full shadow-sm border-gray-300 border-2 focus:border-orange-400 focus:ring-orange-400 focus:outline-none' type="text" />
          <button className='absolute right-2'>
            <span className='bg-orange-400 px-3 py-1.5 rounded-full text-white cursor-pointer'>&rarr;</span>
          </button>
        </div>
      </div>
      
    </div>
    </Layout>
  )
}

export default StreamDetail;