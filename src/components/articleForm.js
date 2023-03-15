import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';
import ReactQuill from "react-quill";

// import tImage from '../images/title_bg3.png'
import tImage from '../images/bg.png'

const ArticleForm = ({_id, title, description, tag, author, createdAt, afterUpdate, selectedTags, setSelectedTags, scrollTop}) => {

  const { userEmailInfo } = useContext(UserContext);

  const onClickTag = (e) => {
    const value = e.target.innerText;
    setSelectedTags(...selectedTags, [value])
    afterUpdate();
    
  }

  return (
    <div className="mx-auto my-10 mb-20 custom-container">
      <div className="flex justify-between break-all" id={_id} >
        <img src={tImage} alt="title_image" className="absolute h-20 w-80 z-10" />
        <button className="text-2xl font-bold text-neutral-800 mx-2 z-20 mt-6 ml-10" onClick={scrollTop}>{title}</button>
        <p className="date text-gray-500 mx-2">{(new Date(createdAt)).toDateString()}</p>
        
      </div>
      <hr className='my-5'></hr>
      {/* <div className="" dangerouslySetInnerHTML={{ __html: description}}></div> */}
      <ReactQuill
        value={description}
        readOnly={true}
        theme={"bubble"}
      />
      <hr className='my-4'></hr>
      <div className=' mb-2 flex justify-between items-center'>
        {
          (tag === "") ?
            <span> </span>
            :
            <button type="button" className='mx-3 my-1 px-2 tag-button' onClick={onClickTag}>{tag}</button>
        }
        
        {
          (userEmailInfo === author) ?
            <Link to={`/edit/${_id}`} className=' text-gray-500 mx-2'>Edit</Link>
          :
          <div>
            <span className=" text-gray-500 mx-2">{author}</span>
          </div>
        }
        
      </div>
    </div>
  )
}

export default ArticleForm


