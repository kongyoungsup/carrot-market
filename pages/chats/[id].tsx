import type { NextPage } from "next";
import Layout from '@components/Layout';
import Message from '@components/Message';

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title='Steve'>
      <div className='py-10 px-4 space-y-6'>
        
        <Message massage='hi' />
        <Message massage='Hi how much are you selling them for?Hi how much are you selling them for?Hi how much are you selling them for?' revers />
        <Message massage='funku'/>
        <Message massage='ㅋㅋㅋㅋㅋㅋㅋ' revers/>

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
  );
};

export default ChatDetail;