import { NextPage } from 'next';
import Layout from '@components/Layout';
import Message from '@components/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';
import cfUrl from '@libs/client/imgUrl';


interface Msg {
  messages: {
    id: number;
    message: string;
    userId: number
  }
}

interface StreamMsg extends Stream{
  messages: Msg[]
}

interface ResStream {
  ok: boolean;
  stream: StreamMsg;
}

interface PostMsg {
  chat: string;
}






const StreamDetail: NextPage = ()=>{

  const router = useRouter()
  const {user} = useUser();
  console.log(user);
  
  const { data, mutate } = useSWR<ResStream>( router.query.id ? `/api/stream/${router.query.id}` : null )
  console.log(data);
  
  const [ postChat, { data: msgData, loading } ] = useMutation<PostMsg>(`/api/stream/${router.query.id}/message`)

  const { register, handleSubmit, reset } = useForm()

  const onValid= (formData: any) => { 
    if(loading) return
    reset()
    mutate(
      (data) =>
      data &&
        ({
          ...data,
          stream: {
            ...data.stream,
            messages: [
              ...data.stream.messages,
              {
                id: Date.now(),
                message: formData.chat,
                userId: user?.id,
              },
            ],
          },
        } as any),
      false
    );
    postChat(formData);    
   }

  //  useEffect(() => {
  //   
  //  }, [msgData]);

    console.log(data);
   
  
  return(
    <Layout canGoBack >
    <div className='px-4 py-10'>

      <div className='py-4 '>
        <div className='w-full bg-gray-300 aspect-video rounded-lg shadow-md' />
      </div>
      <div className=' mt-3'>
          <h1 className='text-2xl font-bold py-2'>{data?.stream?.name}</h1>
          <span className='text-xl font-medium'>$ {data?.stream?.price}</span>
          <p className='mt-5'>
            {data?.stream?.description}
          </p>
      </div>
      <div className='py-4 '>
        <h3 className='font-semibold text-gray-800 text-2xl mt-2 py-2'>Live Chat</h3>
      </div>
      <div className='py-5 px-4 pb-16 space-y-6 h-[50vh] overflow-scroll'>
        
        {data?.stream?.messages.map((messages: any) => 

          <Message src={cfUrl({id: messages.user.avator, variant: 'avator'})} key={messages.id} massage={messages.message} revers={ (messages.userId) === (user?.id) } />

        )}
      </div>

      <div className='fixed bottom-5 mx-auto max-w-md inset-x-0'>
        <form onSubmit={handleSubmit(onValid)} className='flex relative items-center '>
          <input {...register('chat', {required: true})} className='w-full rounded-full shadow-sm border-gray-300 border-2 focus:border-orange-400 focus:ring-orange-400 focus:outline-none' type="text" />
          <button className='absolute right-2'>
            <span className='bg-orange-400 px-3 py-1.5 rounded-full text-white cursor-pointer'>&rarr;</span>
          </button>
        </form>
      </div>
      
    </div>
    </Layout>
  )
}

export default StreamDetail;