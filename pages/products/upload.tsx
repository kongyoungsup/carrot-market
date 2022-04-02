import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface TypeUploadProduct {
  name: string;
  price: number;
  desc: string;
  productImg: FileList;
}

const Upload: NextPage = () => {

  const { user } = useUser();
  const { register, handleSubmit, watch } = useForm<TypeUploadProduct>();
  const [uploadProduct, { loading, data }] = useMutation('/api/products');
  const [productImgPrew, setProductImgPrew] = useState< string | undefined>();

  const router = useRouter();

  const productImgVar = watch('productImg');

  useEffect(() => {
    if(productImgVar && productImgVar.length > 0) {
      const file = productImgVar[0];
      setProductImgPrew(URL.createObjectURL(file));
    }
  }, [productImgVar]);

  const onValid = async ( formData: TypeUploadProduct ) => { 
    if (loading) return

    if ( productImgVar && productImgVar.length > 0 && user) {
      
      const cloudFlareRequest = await (await fetch('/api/files')).json();
      console.log(cloudFlareRequest);
      
      const form = new FormData();
      form.append('file', productImgVar[0], `userProf_${user.id}`);

      console.log(form);
      
      const { result: { id } } = await (await fetch(cloudFlareRequest.result.uploadURL,{
        method: "POST",
        body: form
      })).json();

      uploadProduct({...formData, productImgId: id });
    }

    uploadProduct(formData)
   }
   
   useEffect(() => {
     if (data?.ok) {
      router.push(`/products/${data.product.id}`)
     }
   }, [data, router]);
   
  return(
    <Layout canGoBack title='Upload' >
    <form onSubmit={handleSubmit(onValid)} className='flex flex-col p-4 py-16 space-y-5'>
      
      <div className=''>
          <label className='flex flex-col justify-center items-center rounded-lg  cursor-pointer h-48 w-full 
                            border-dashed border-2 border-gray-400
                            hover:border-orange-400 hover:text-orange-500 hover:text-'>
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            { productImgPrew 
              ? <img src={productImgPrew} alt="" /> 
              : null 
            }
            
            <input {...register('productImg')} className='' type="file" />
          </label>
      </div>
      <Input title='Name' 
             formReg={register('name', {required: true})} 
             label="name"  />
      <Input title='Price' 
             formReg={register('price', {required: true})} 
             label="price" kind='price'  />
      <TextArea title='Description' 
                formReg={register('desc', {required: true})} 
                titleTrue />
      <Button title={ loading ? 'loding...' : 'Upload product' } />

    </form>
    </Layout>
  )
}

export default Upload;