import Layout from '@components/Layout';
import ProductList from '@components/ProductList';
import type { NextPage } from "next";


const Loved: NextPage = () => {
  
  return (
    <Layout hasTabBar canGoBack>
    <div className="flex flex-col space-y-5 py-10">
    <h1 className='pl-5 text-lg font-medium'>관심 목록</h1>
      <ProductList kind='favs' />
    </div>
    </Layout>
  )
}

export default Loved;

