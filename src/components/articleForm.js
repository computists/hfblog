import React from 'react'
import { Link } from 'react-router-dom';

const ArticleForm = ({_id, title, description, tag, createdAt}) => {
  return (
    <div className="mx-auto  my-10 custom-container">
      <p className="date">{(new Date(createdAt)).toDateString()}</p>
      <p className="title text-xl  text">{title}</p>
      <div className="" dangerouslySetInnerHTML={{ __html: description}}></div>
      <p>{tag}</p>
      <div className="text-right">
        <Link to={`/edit/${_id}`} className='text-gray-500'>Edit</Link>
      </div>
    </div>
  )
}

export default ArticleForm


