import type { NextPage } from "next";
import Item from '@components/Item';


const Loved: NextPage = () => {
  return (
    <div className="flex flex-col space-y-5 py-10">
    <h1 className='pl-5 text-lg font-medium'>관심 목록</h1>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item 
          id={i} 
          title='New iPhone 14' 
          price={99}
          comments={2}
          hearts={1}  
        />
      ))}
    </div>
  )
}

export default Loved;

