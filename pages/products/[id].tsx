import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Button from '@components/Button';
import Layout from '@components/Layout';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Product, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import useUser from '@libs/client/useUser';
import cfUrl from '@libs/client/imgUrl';
import Image from 'next/image';
import styles from '../../styles/Image.module.css'



interface TypeProductUser extends Product {
  user: User;
}

interface TypeProduct {
  ok: boolean;
  product: TypeProductUser;
  relatedProduct: Product | any;
  isLiked: boolean;
}


const ItemDetail:NextPage = ()=> {

  const { user, isLoding } = useUser()

  console.log(user);
  

  const router = useRouter();
  const { mutate: glbalMutate } = useSWRConfig()

                                              // router.query 를 api로 사용 가져오면 검증해야됨.
  const { data , mutate} = useSWR<TypeProduct>(router.query.id ? `/api/products/${router.query.id}` : null )
  const [ toggleFav ] = useMutation(`/api/products/${router.query.id}/fav`)

  const [ createChat,{ data: charRoomRes, loading} ] = useMutation(`/api/chat/${router.query.id}`)



  const addFav = () => { 
  // 타입스크립트 에러 방지
  if(!data) return

  // post 요청을 하기전에 빠르게 미리 변경
  // 콜백함수 사용, 인자로 data 를 가져온다
  mutate( (prev) => prev && {...prev, isLiked: !prev.isLiked }, false );

  // post 요청 go
  toggleFav();
  }

  const logout = () => { 
    if(!data) return
    const logg = glbalMutate('/api/users/me', { ok: false  })
    console.log(logg);
    
   }

  const onChat = () => { 
    if(loading) return
    createChat() 
  }

  console.log(charRoomRes);
  

  useEffect(() => {
    if(charRoomRes && charRoomRes?.ok){
      router.push(`/chats/${charRoomRes?.id}`)
    }
  }, [charRoomRes]);

   

   
  return(
    <Layout canGoBack>
      <button onClick={logout}>logout</button>
    <div>
      {/* { !data?.ok ? <h1 className='text-5xl'>Loding...</h1> : ( */}
      <>
      <div className='p-4 '>

        { data?.product?.image 
        ? (<div className={styles.imageContainer}>
            <Image 
              src={cfUrl({id: data?.product?.image, variant: 'public'})} 
              layout='fill'
              className={styles.image}
            />
          </div>)
        : (<div className=' w-full h-80 bg-gray-400 object-cover' />)
        }
        
        <div className=' flex border-b  py-4 items-center'>
          { data?.product?.user?.avator 
            ? <Image src={cfUrl({id: data?.product?.user?.avator, variant: 'avator'})} 
                height={48} width={48} 
                className='bg-gray-300 rounded-full object-cover' 
                priority
              />
            : <div className=' w-12 h-12 bg-gray-300 rounded-full' />
          }
          <div className=' pl-3'>
            <p className=' font-bold text-sm '>
              {data?.product?.user?.name}
            </p>
            <Link href={`/user/profiles/${data?.product?.user?.id}`}>
              <a className=' text-xs cursor-pointer hover:pl-1 transition'>
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div className=' mt-3'>
          <h1 className='text-2xl font-bold py-2'>
            {data?.product?.name}
          </h1>
          <span className='text-xl font-medium'>
            $ {data?.product?.price}
          </span>
          <p className='mt-5'>
            {data?.product?.description}
          </p>
          <div className='flex space-x-3 items-center mt-3'>
            <Button onClick={onChat} title='Talk to seller' />
            <button onClick={addFav} className=' p-3 hover:bg-gray-200 transition hover:rounded-md '>
              <svg
                className={cls(
                  "h-6 w-6 text-center ", 
                  data?.isLiked ? "text-red-600" : ""
                )}
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
        <ul className='grid grid-cols-2 gap-4' >
          {data?.relatedProduct?.map((relatedProduct: any) => (
            <li key={relatedProduct.id}>
            <Link href={`/products/${relatedProduct.id}`}>
              <div className='cursor-pointer'>
                <div className=' aspect-square bg-gray-400 mb-2' />
                <h3 className='text-sm text-gray-700'>
                  {relatedProduct.name}
                </h3>
                <p className='text-xs'>
                  $ {relatedProduct.price}
                </p>
              </div>
            </Link>
            </li>
          ))}
        </ul>
      </div>
      </>
      {/* )} */}
    </div>
    </Layout>
  )
}

export default ItemDetail;





// const router = useRouter();

// // router.query 를 api로 사용 가져오면 검증해야됨.
// const { data , mutate} = useSWR<TypeProduct>(router.query.id ? `/api/products/${router.query.id}` : null )
// const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`)
// // console.log(favData.isLike);

// const addFav = () => { 
// if(!data) return
// // post 요청을 하기전에 빠르게 미리 변경
// // 콜백함수 사용, 인자로 data 를 가져온다
// mutate( (prev) => prev && {...prev, isLiked: !prev.isLiked }, false );
// // post 요청 go
// toggleFav();
// }
