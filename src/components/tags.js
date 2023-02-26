import React, { useContext } from 'react'
import { PostContext } from '../contexts/post.context'

const Tags = ({tags, onTagClick}) => {
  const { setTagsCont } = useContext(PostContext);

  const onClickTags = (e) => {
    console.log(e.target)
    console.log(e.target.innerText)
    onTagClick(e.target.innerText);    
  }
  
  return (
    <div>
      <div className="mx-auto my-10 custom-container">
        <ul>
          {
            tags.map(tag => <span className='mx-3' id={tag} onClick={onClickTags}>{tag}</span> )
          }
        </ul>
      </div>
      
    </div>
  )
}

export default Tags;