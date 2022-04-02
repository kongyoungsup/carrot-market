import {NextPage} from 'next';
import Link from 'next/link';
import Layout from '@components/Layout';
import useSWR from 'swr';
import Image from 'next/image';
import cfUrl from '@libs/client/imgUrl';
import useUser from '@libs/client/useUser';

const Chats: NextPage = ( )=>{
  
  const {data} = useSWR('/api/chat')
  const {user} = useUser()

  return(
    <Layout title='홈' hasTabBar>
      <div className='py-10 px-4 divide-y-[1px]  '>
        {data?.id.map((data:any, i:number) => (
          <Link key={i}  href={`/chats/${data?.productId}`}>
          <div className="flex px-4 cursor-pointer py-3 items-center space-x-3" >
            {}
            <Image 
              src={cfUrl({
                id: (data?.createFor?.id === user?.id) ? (data?.createBy?.avator) : (data?.createFor?.avator), 
                variant: 'avator'
              })} 
              height={48} width={48} className="w-12 h-12 rounded-full bg-slate-300 object-cover" />
            <div>
              <p className="text-gray-700">{ (data?.createFor?.id === user?.id) ? (data?.createBy?.name) : (data?.createFor?.name) }</p>
              <p className="text-sm  text-gray-500">
                {(data?.chats[0]?.userId === user?.id) ? (<span><b>Me: </b>{data?.chats[0]?.Message}</span>)  : (<span>{data?.chats[0]?.Message}</span>) }
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Chats;