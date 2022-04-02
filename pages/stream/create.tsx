import react, { useEffect } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

interface ReqStream {
  name: string;
  price: number;
  description: string;
}

function Create() {
  const { register, handleSubmit } = useForm<ReqStream>()
  const [ createstream, { data, loading, error } ] = useMutation('/api/stream');
  const router = useRouter();
  const onValid = (formData: ReqStream) => { 
    if(loading) return;
    createstream(formData);
   }

   useEffect(() => {
     if (data && data.ok) {
       router.replace(`/stream/${data?.streamId}`)
     }
   }, [data, router]);

   

  return(
    <Layout canGoBack>
    <form onSubmit={handleSubmit(onValid)} className='flex flex-col p-4 py-10 space-y-5'>
      <Input formReg={register('name', { required: true })} label='name' title='name' kind='text' type='text' />
      <Input formReg={register('price', { required: true, valueAsNumber: true })} label='price' title='price'kind='price' type='number'  />
      <TextArea formReg={register('description')} titleTrue title='Description' row={5} label='textarea' placeholder='text...' />
      <Button title='Go live' />
    </form>
    </Layout>
  )
}

export default Create;