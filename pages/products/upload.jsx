import react from 'react';

function Upload() {
  return(
    <div className='flex flex-col p-4 py-16 space-y-5'>

      <div className=''>
          <label className='flex flex-col justify-center items-center rounded-lg  cursor-pointer h-48 w-full 
                            border-dashed border-2 border-gray-400
                            hover:border-orange-400 hover:text-orange-500 hover:text-'>
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className='' type="file" />
          </label>
      </div>

      <div className='flex flex-col'> 
        <label className='mb-2'>Name</label>
        <div className='flex items-center'>
          <input className='w-full h-10 border-gray-400 focus:outline-none'  type="text" placeholder="" />
       </div>
      </div>

      <div className='flex flex-col'> 
        <label className='mb-2'>Price</label>
        <div className='flex items-center'>
          <div className='px-2 h-10 border border-r-0 flex items-center border-gray-400'>
            <span>$</span>
          </div>
          <input className='w-full h-10 border-l-0 border-r-0 border-gray-400 focus:outline-none'  type="text" placeholder="0.00" />
          <div className='px-2 h-10 border border-l-0 flex items-center border-gray-400'>
            <span>USD</span>
          </div>
        </div>
      </div>

      <div>
        <label className='flex mb-2'>Description</label>
        <div>
          <textarea className='w-full border-gray-400' rows={4} />
        </div>
      </div>
      <button className=' bg-orange-400 py-3 text-white rounded-lg'>Upload product</button>

    </div>
  )
}

export default Upload;