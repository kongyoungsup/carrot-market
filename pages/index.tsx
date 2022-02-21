import type { NextPage } from "next";
import FloatingButton from '@components/FloatingButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@libs/client/useUser';

const Home: NextPage = () => {
  const { user, isLoding } = useUser();
  console.log(user);
  
  return (
    <Layout title='홈' hasTabBar>
      <div>

        {[1,2,3,4,5,6,7,8,9].map((_, i)=>(
        <Item 
          key={i}
          id={i} 
          title='New iPhone 14' 
          price={99}
          comments={2}
          hearts={1}  
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
  )};

export default Home;
