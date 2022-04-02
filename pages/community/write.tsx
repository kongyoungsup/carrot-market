import type { NextPage } from "next";
import Button from '@components/Button';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCoords from '@libs/client/useCoords';

interface TypePost {
  desc: string,
}

const Write: NextPage = () => {

  const { latitude, longitude } = useCoords()

  
  const { register, handleSubmit } = useForm<TypePost>();
  const [writePost, { loading, data: postRes }] = useMutation('/api/community');
  const router = useRouter(); 

  const onValid = (data: TypePost) => { 
    if(loading) return // 여러번 클릭 방지
    writePost({...data, latitude, longitude})
    
   }

  useEffect(() => {
    if (postRes?.ok) {
      router.push(`/community/${postRes.postId}`)
    }
  }, [postRes, router]);
    
  return(
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <TextArea formReg={register('desc')} placeholder='질문을 작성해 주세요..' required/>
        <Button title={loading ? 'Loding' : 'submit'} />
      </form>
    </Layout>
  )
}


export default Write;