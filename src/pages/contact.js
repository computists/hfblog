import React from 'react'

const Contact = () => {
  return (
      <div className="m-3 mt-10 mx-auto sm:max-w-[60%] custom-container">
        <form action="" className="flex flex-col px-8 py-4">
          <span className='my-3'>Name</span>
          <input type="text" className='h-8'></input>
          <span className='my-3'>E-mail address</span>
          <input type="text" className='h-8'></input>
          <span className='my-3'>Content</span>
          <input type="text" className='h-20'></input>
          <div className='text-right my-6'>
            <button className="mx-2 px-4 py-2">Back</button>
            <button className="mx-2 px-4 py-2">Clear</button>
            <button className="ml-2 px-4 py-2">Send</button>
          </div>
        </form>
    </div>
  )
}

export default Contact
