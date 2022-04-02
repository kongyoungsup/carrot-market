import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";


// 가져올 아이템 개수
const PAGE_SIZE = 3;

export default function App() {

  const getKey = (index) => `/api/testo/infi?per_page=${PAGE_SIZE}&page=${index}`;
                                                                                        // 초기 페이징 값    // 추가 데이터 호출할시, 이전값 업데이트 여부
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite( getKey, { initialSize: 2, revalidateFirstPage: false })
  
  // 응답 data에 배열 추가
  const issues = data ? [].concat(...data) : [];

  // 로딩 변수..
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || ( size > 0 && data && typeof data[size - 1] === "undefined" );
  
  // 빈 배열 처리 변수..
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && (data[data.length - 1]?.length < PAGE_SIZE));
    
  // 재렌더시 처리 변수.. 
  const isRefreshing = isValidating && data && data.length === size;
 


  // ========= 스크롤 인피니티  ===================

  const handleScroll = () => {

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight + ( document.documentElement.clientHeight / 2);

      // 페이지 끝에 도달하면 추가 데이터를 받아온다\
      if (scrollTop + clientHeight >= scrollHeight ) {
        if(isValidating) return
        setSize(size + 1);
      }
    
   };

   useEffect(() => {

      // scroll event listener 등록
      window.addEventListener("scroll", handleScroll);

      // scroll event listener 해제
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

  });

    // =====================================

  return (
    <div style={{ fontFamily: "sans-serif" }}>

      <button
        className='bg-orange-400 px-2 py-1 rounded-md text-white'
        onClick={() => {
          setSize(1);
        }}
      >
        load issues
      </button>
      
      {/* // 더보기 data 호출 */}
      <button
          className='bg-orange-400 px-2 py-1 rounded-md text-white'
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
      </button>

      {/* // 데이터 새로고침 */}
      <button 
          className='bg-orange-400 px-2 py-1 rounded-md text-white'
          disabled={isRefreshing} 
          onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
      </button>

      {/* // 데이터 초기화 */}
      <button 
          className='bg-orange-400 px-2 py-1 rounded-md text-white'
          disabled={!size} 
          onClick={() => setSize(0)}>
          clear
      </button>

      <p>
        showing {size} pages of { isLoadingMore ? "..." : issues.length }
      </p>

      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {issues.map((issue) => {
        return (
          <p key={issue.id} className="py-28 px-4 bg-slate-300 mt-4  ">
            <b>- {issue.id}</b>
            <p>- {issue.name}</p>
            <p>- {issue.description}</p>
          </p>
        );
      })}
      
    </div>
  );
}
