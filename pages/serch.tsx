import type { NextPage } from "next";
import FloatingButton from '@components/FloatingButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Product } from '@prisma/client';
import Input from '@components/Input';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TypeFavcount extends TypeProduct{
  _count: number;
}

interface TypeProduct{
  ok: boolean;
  product: TypeFavcount | any;
  serch: string;
}

const Home: NextPage = () => {
  const router = useRouter()
  const keyword = router.query.keyword;
  const {data} = useSWR<TypeProduct>( keyword ? `/api/products/serch?keyword=${keyword}` : null)

  const { register, watch, handleSubmit } = useForm<TypeFavcount>();
  
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
        {data && data.product ? null : <h2 className='text-center mt-5'>검색결과가 없습니다ㅎ</h2> }
        {data?.product?.map((product: any)=>(
        <Item 
          key={product.id}
          id={product.id} 
          title={product.name}
          price={product.price}
          comments={2}
          hearts={product._count?.favs}  
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

export default Home;
