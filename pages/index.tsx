import type { NextPage, NextPageContext } from "next";
import FloatingButton from '@components/FloatingButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import Input from '@components/Input';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next'
import { client } from '@libs/server/clients';

interface TypeFavcount extends TypeProduct{
  _count: number;
  serch: string;
}

interface TypeProduct{
  ok: boolean;
  product: TypeFavcount[] | any;
}



const Home: NextPage = () => { 
  const { user, isLoding } = useUser();
  // console.log(user);
  
  const {data} = useSWR<TypeProduct>('/api/products')
  
  const { register, watch, handleSubmit } = useForm<TypeFavcount>();
  
  const router = useRouter()
  const onSerch = (formData: TypeFavcount) => { 
    if (!formData) return
    router.push(`/serch?keyword=${watch('serch')}`)
   }

  return ( 
    <>
    <Layout title='홈' hasTabBar >
      <div>
        <form onSubmit={handleSubmit(onSerch)}>
          <Input formReg={register('serch',{ required: true})} label='serch' title='검색'  />
          <Button title='검색'></Button>
        </form>
          {data?.product?.map((product: any)=>(
          <Item 
            key={product.id}
            id={product.id} 
            title={product.name}
            price={product.price}
            comments={2}
            hearts={product._count?.favs || 0}  
          />
          ))}
        <FloatingButton href='/products/upload'>
          <svg
            className="h-7 w-7 mx-auto font-bold "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>

      </div>
    </Layout>
    </>
  )};


export const getServerSideProps = async () => {
  
  const product = await client.product.findMany({})

  return {
    props: {
      fallback: {
        '/api/products': { 
          ok: true, 
          product: JSON.parse(JSON.stringify(product))
        }
      }
    },
  }
}


const page: NextPage<{fallback: TypeFavcount[]}> = ( {fallback} ) => { 
  return(
    <SWRConfig value={{ fallback }} >
      <Home />
    </SWRConfig>
  )
  }



export default page;
