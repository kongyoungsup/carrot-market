import Link from 'next/link';
import react from 'react';
import FloatingButton from '@components/FloatingButton';
import Layout from '@components/Layout';
import useSWR from 'swr';
import { Post, User } from '@prisma/client';
import useCoords from '@libs/client/useCoords';
import { client } from '@libs/server/clients';
import { NextPage } from 'next';

interface TypeUser extends Post{
  uset: User;
}

interface TypePosts{
  ok: boolean;
  posts: TypeUser | any;
}

const Community: NextPage<any> = ({posts}) => {

  
  // GeoCord 위치기반
  // const { latitude, longitude } = useCoords();
  // const { data, error } = useSWR<TypePosts>(latitude && longitude ? `/api/community?latitude=${latitude}&longitude=${longitude}` : null)

  // const { data, error } = useSWR<TypePosts>('/api/community')

  return(
    <Layout title='홈' hasTabBar>
      <div className=' py-16'>

        {posts?.map((data: any)=>(
          <div key={data.id} className='p-4'>
            <div className='mb-2'>
              <span className='bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-800'>동네질문</span>
            </div>

            <Link href={`/community/${data.id}`}>
            <a className='flex mb-2 hover:text-red-500 '>
                <span className='text-orange-500 pr-2'>Q.</span> {data.question}
            </a>
            </Link>

            <div className='flex justify-between border-b py-2 items-center'>
              <span className=' '>{data.user.name}</span>
              <span className=''>18시간 전</span>
            </div>

            <div className='flex space-x-6 py-4 border-b'>
              <span className='flex items-center space-x-2'>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {data._count.wonderings}</span>
              </span>
              <span className='flex items-center space-x-2'>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>답변 {data._count.answers}</span>
              </span>
            </div>
          </div>
        ))}

        <FloatingButton href={'/community/write'} >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
        
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  console.log('run Isr');
  const posts = await client.post.findMany({
    include:{
      user:{ 
        select:{
          id: true,
          name: true,
          email: true
          } 
      },
      _count:{
        select:{
          answers: true,
          wonderings: true
        }
      }
    }


  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    // revalidate: 10, 
  }
}

export default Community;