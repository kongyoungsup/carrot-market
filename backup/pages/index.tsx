import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      
      <div className=' flex flex-col justify-between bg-white p-6 rounded-3xl shadow-xl'>
          <span className=' font-semibold text-3xl'>Select item</span>
          <ul className='flex flex-col justify-between '>
            {
            [1,2,3,4,5].map((i)=>(
            <li key={i} className=' flex justify-between my-2 first:bg-gray-200 last:bg-gray-400'>
              <span className='text-gray-500'>Grey Chair</span>
              <span className=' font-semibold'>$19</span>
            </li>
            ))
            }
          </ul>
          <div className=' flex justify-between my-2 pt-2 border-t-2 border-dashed'>
            <span>Total</span>
            <span className=' font-semibold'>$9</span>
          </div>
          <button  
            className='mt-5 bg-blue-500 text-white 
            p-3 text-center rounded-xl w-1/2 mx-auto
            hover:bg-white hover:text-blue-500 ring-4 ring-inset ring-blue-500
            active:bg-yellow-500 focus:text-red-500
            
            '
          >CheckOut</button>
      </div>

      <div className=' group bg-white overflow-hidden rounded-3xl shadow-xl cursor-pointer'>
        <div className='bg-blue-500 p-6 pb-14 lg:pb-36'> 
          <span className=' text-white text-2xl'>Profile</span>
        </div>
        <div className=' rounded-3xl p-6 bg-white relative -top-5'>
          <div className='flex relative -top-16 items-end justify-between'>
            <div className='flex flex-col items-center'>
              <span>Orders</span>
              <span>340</span>
            </div>
            {/* <div className="h-24 w-24 bg-red-400 rounded-full"></div> */}
            <div className="h-24 w-24 bg-red-300 rounded-full group-hover:bg-blue-300 transition-color "></div>
            <div className='flex flex-col items-center'>
              <span>Spent</span>
              <span>$2,310</span>
            </div>
          </div>
          <div className="relative  flex flex-col items-center -mt-10 -mb-5">
            <span>Tony Molloy</span>
            <span>New York, USA</span>
          </div>
        </div>
      </div>

      <div className=' bg-white rounded-3xl shadow-xl p-6 lg:col-span-1'>
        {/* // 헤더 */}
        <div className='flex mb-5 justify-between items-center'>
          <span>←</span>
          <div className=' space-x-2'>
            <span>⭐️ 4.9</span>
            <span>❤️</span>
          </div>
        </div>
        {/* // 이미지 */}
        <div className='bg-zinc-400 h-80 mb-5' />
        {/* // 푸터 */}
        <div className='flex flex-col'>
          <span className='font-medium'>Swoon lounge</span>
          <span className=' text-sm text-gray-500'>Chair</span>
          {/* // 푸터 */}
          <div className='mt-2 mb-5 flex justify-between items-center'>
            <div className=' space-x-2'>
              <button className='w-5 h-5 rounded-full bg-yellow-500
              focus:ring-2 ring-offset-2 ring-yellow-500 transition ' />
              <button className='w-5 h-5 rounded-full bg-indigo-500
              focus:ring-2 ring-offset-2 ring-indigo-500 transition ' />
              <button className='w-5 h-5 rounded-full bg-teal-500
              focus:ring-2 ring-offset-2 ring-teal-500 transition ' />
            </div>
            <div className=' space-x-3'>
              <button className=' bg-slate-200 rounded-xl p-2 aspect-square w-10 text-xl text-gray-500'>-</button>
              <span>1</span>
              <button className=' bg-slate-200 rounded-xl p-2 aspect-square w-10 text-xl text-gray-500'>+</button>
            </div>
          </div>
          <div className='flex justify-between items-center text-lg font-semibold mt-2'>
              <span>$450</span>
              <button className=' bg-blue-500 text-white py-3 px-8 text-sm rounded-lg '>ADD TO CART</button>
            </div>
        </div>
        
      </div>

      {/* <div className=' bg-white rounded-3xl shadow-xl p-6 lg:col-span-2'>
        <details className='open:bg-slate-100'>
          <summary className=' cursor-pointer select-none'>title...</summary>
          <p className=' selection:text-white selection:bg-green-500'>wsdklwdklwkdlwkdlwd</p>
        </details>
        <ul className=' list-disc marker:text-green-500'>
          <li>hi...</li>
          <li>hi...</li>
          <li>hi...</li>
          <li>hi...</li>
        </ul>
        <form action="" className=' bg-blue-400 p-5 flex flex-col space-y-4 focus-within:'>
          <input className=' required:border-2 border-yellow-400' required type="text" />
          <input className=' peer' type="text" required />
          <span className=' hidden peer-invalid:block text-red-500'>this input is invalid</span>
          <span className=' hidden peer-valid:block text-teal-200'>awsoom use name</span>
          <input className='' type="text" />
        </form>
      </div> */}

    </div>

  );
};

export default Home;
