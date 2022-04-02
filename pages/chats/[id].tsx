import type { NextPage } from "next";
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useUser from '@libs/client/useUser';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import cfUrl from '@libs/client/imgUrl';

const ChatDetail: NextPage = () => {

  const router  = useRouter()
  const {user} = useUser();
  const { register, handleSubmit, reset } = useForm()
  const {data, mutate} = useSWR(router.query.id ? `/api/chat/${router.query.id}/masseges` :  null)
  const [reqChat, {data: resData, loading}] = useMutation(`/api/chat/${router.query.id}/masseges`)

  console.log(data);
  
  const onChat = (formData: any) => { 
    if(loading) return
    reset()
    const id = data?.chatMsg?.id;
    reqChat({...formData, id})
    mutate()
  }

  useEffect(() => {
    mutate()
  }, [resData]);


   console.log(resData);
   
  

  return (
    <Layout canGoBack title='Steve'>
      <div className='py-10 px-4 space-y-6'>
        
        {data?.chatMsg?.chats.map((Msg: any, i:number) => 

        <Message src={cfUrl({id:Msg.user?.avator, variant:'avator'})} height={48} width={48} key={i} massage={Msg.Message} revers={ (Msg.userId) === (user?.id) } />

        )}

        <div className='fixed bottom-5 mx-auto max-w-md inset-x-0'>
          <form onSubmit={handleSubmit(onChat)} className='flex relative items-center '>
            <input {...register('msg')} className='w-full rounded-full shadow-sm border-gray-300 border-2 focus:border-orange-400 focus:ring-orange-400 focus:outline-none' type="text" />
            <button className='absolute right-2'>
              <span className='bg-orange-400 px-3 py-1.5 rounded-full text-white cursor-pointer'>&rarr;</span>
            </button>
          </form>
        </div>
        
      </div>
    </Layout>
  );
};

export default ChatDetail;