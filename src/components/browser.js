import React from 'react'

const Browser = () => {
  return (
    <div>
      <div className="mx-auto my-10 custom-container">
        <div className="border-b-2 border-gray-400 border-dashed">[test] Lorem ipsum dolor sit amet.</div>
        <div className="border-b-2 border-gray-400 border-dashed">[tag] Lorem ipsum dolor sit amet consectetur.</div>
        <div className="border-b-2 border-gray-400 border-dashed">[programming] Lorem, ipsum dolor.</div>
        <div className="flex justify-center mt-2">
          <button className="mx-auto"> Prev</button>
          <div className="">...</div>
          <button className="mx-auto">Next</button>
        </div>
      </div>
    </div>
  )
}

export default Browser;
