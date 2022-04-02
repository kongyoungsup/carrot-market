import react, { useEffect } from 'react';
import Button from '@components/Button';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Answer, Post, User } from '@prisma/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';

interface TypeAnswers extends Post {
  user: User;
  anwer: string;
}

interface TypeProductUser extends Answer {
  user: User;
}

interface TypeDetail {
  ok: boolean;
  postDetail: TypeProductUser | TypeAnswers | any | boolean;
  wonderCheck: boolean;
}

interface TypeAnswer {
  answer: string;
}

function CommunityPostDetail() {

  const router = useRouter();

  // (GET) community 상세페이지
  const { data , mutate} = useSWR<TypeDetail>(router.query.id ? `/api/community/${router.query.id}` : null )


  // (POST) Answer 업로드
  const { register, handleSubmit, watch, reset } = useForm<TypeAnswer>();
  const [ mutationAnswer, { loading: loadingAnswer , data: resAnswer, error } ] = useMutation(`/api/community/${router.query.id}/answer`);
  
  const  onValid = (formData: TypeAnswer) => { 
    if (loadingAnswer) return
    // mutationAnswer(formData);
    mutationAnswer(formData);
   }

   useEffect(() => {
    if (resAnswer && resAnswer.ok) {
    reset()
    mutate()
    }
  }, [resAnswer]);


  // (POST) Wondering(궁금해요) 업로드
  const [ mutationWonder, { loading: loadingWonder, data: resWonder } ] = useMutation(`/api/community/${router.query.id}/wonder`);

  const onWonder = () => { 
  if (!data) return;
  mutate(
    {
      ...data,
      postDetail: {
        ...data.postDetail,
        _count: {
          ...data.postDetail._count,
          wonderings: data.wonderCheck
            ? data?.postDetail._count.wonderings - 1
            : data?.postDetail._count.wonderings + 1,
        },
      },
      wonderCheck: !data.wonderCheck,
    },false
  );

  if (!loadingWonder) {
    mutationWonder()
  }
  }
  console.log(resWonder);
  

  

   
  
  return(
    <Layout canGoBack >
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">{data?.postDetail?.user?.name}</p>
            <Link href={`/user/profiles/${data?.postDetail?.user?.id}`}>
              <p className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </p>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q. </span> 
            {data?.postDetail?.question}
          </div>
          <div className=
            "flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button onClick={onWonder} className={cls("flex space-x-2 items-center text-sm",
              data?.wonderCheck ? "text-teal-500" : ""
            )}>
              <svg
                className="w-4 h-4"
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
              <span>궁금해요 {data?.postDetail?._count?.wonderings}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
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
              <span>답변 {data?.postDetail?._count?.answers}</span>
            </span>
          </div>
        </div>

        {data?.postDetail?.answers?.map((answers: TypeAnswers) => (
          <div key={answers.id} className="px-4 my-5 space-y-5">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div>
              <span className="text-sm block font-medium text-gray-700">
                {answers?.user?.name}
              </span>
              <span className="text-xs text-gray-500 block ">2시간 전</span>
              <p className="text-gray-700 mt-2">
                {answers?.anwer}
              </p>
            </div>
          </div>
        </div>
        )) }
        
        <div className="px-4">
          <form onSubmit={handleSubmit(onValid)}>
            <TextArea formReg={register( 'answer',{required: true} )} placeholder='질문 댓글 작성..'/>
            <Button title={ loadingAnswer ? 'loding...' : 'Submit' } />
          </form>
        </div>
        
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;