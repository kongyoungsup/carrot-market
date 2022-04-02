import { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/FloatingButton';
import Layout from '@components/Layout';
import useSWR from 'swr';
import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { cls } from '@libs/client/utils';


interface TypePage {
  page: number;
  pageLimit: number;
  setPageState: Function;
}


function StreamList({page, setPageState ,pageLimit}: TypePage) {
  
  const { data, isValidating } = useSWR( `/api/stream?page=${page}&pageLimit=${pageLimit}` )
  // 데이터 로딩 상태를 부모로 전달
  setPageState(isValidating);
  
  return(
    <>
    {data?.streamList.map((stream: any)=>(
      <div key={stream?.id} className='py-4 '>
        <div className='w-full bg-gray-300 aspect-video rounded-lg shadow-md' />
        <Link href={`/stream/${stream?.id}`}>
          <h3 className='font-medium text-gray-700 text-lg mt-2 cursor-pointer'>{stream?.name}</h3>
        </Link>
      </div>
    ))}
    </>
  )
}


const Stream: NextPage = ()=>{

  const [page, setPage] = useState(0);
  const pageLimit = 3

  // StreamList 컴포넌트의 데이터 로딩 상태
  const [pageState, setPageState] = useState(true);
  console.log(pageState);
  
  // stream 아이템 갯수 호출
  const { data: pagecount } = useSWR( '/api/stream/pagecount' )


  const streamCount = pagecount?.streamCount
  const numpages = Math.ceil(streamCount / pageLimit);
  
  function name(nump: any) {
    const pageNums = [];
    for (let i = 0; i < nump; i++) {
      pageNums.push(i);
    }
    return pageNums
  }

  const onPrevBtn = () => { 
    if (pageState) return;
    setPage((prev) => prev <= 1 ? page : page - 1);
  }

  const onNextBtn = () => { 
    if (pageState) return;
    setPage((prev) => prev >= (numpages - 1) ? page : page + 1);
  }

  const columns = useMemo(() => name(numpages), [streamCount]);


  return(
    <Layout title='홈' hasTabBar>
      <div className='px-4 py-10 divide-y-2'>

        <StreamList page={page} setPageState={setPageState} pageLimit={pageLimit}/>
        <div style={{ display: 'none' }}>
          <StreamList page={page + 1} setPageState={setPageState} pageLimit={pageLimit}/>
        </div>

        <div className='py-4 px-32 flex justify-between'>
          <button className='bg-green-400' onClick={onPrevBtn}>Previous</button>
          <button className='bg-green-400' onClick={onNextBtn}>Next</button>
        </div>

        {columns.map((_, i) => (
            <button
              className={cls(
                'mx-2 my-1 px-2 ', 
                i === page ? 'bg-lime-200' : 'bg-blue-200'
              )}
              key={i + 1}
              onClick={() => {
                setPage(i);
              } }
            >
              {i + 1}
            </button>
          ))}
        <FloatingButton href="/stream/create">
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
      
    </Layout>
  )
}



export default Stream;