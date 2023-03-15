import React from 'react'

const Browser = ({browsingPosts, setBrowsingPosts, afterUpdate, scrollToDiv}) => {

  const onNextClick = () => {
    setBrowsingPosts({...browsingPosts, current:browsingPosts.current+1})
    afterUpdate();
  }
  
  const onPrevClick = () => {
    setBrowsingPosts({...browsingPosts, current:browsingPosts.current-1})
    afterUpdate();
  }

  const onTitleClick = (id) => {
    // This method doesn't work, it can't get any element value.
    // console.log(id)
    // const element = ReactDOM.createRoot(document.getElementById({id})) ;
    // console.log(element)
    // if (element) {
    //   element.scrollIntoView({behavior: 'smooth'});
    // }
    scrollToDiv(id);


  }
  
  return (
    <div>
      <div className="mx-auto my-10 custom-container w-full">
        {
          browsingPosts.posts.map((post) => (<div className="border-b-2 border-gray-400 border-dashed my-1" ><button onClick={ () => onTitleClick(post._id) }>{post.title}</button></div>))
        }

        <div className="flex justify-center mt-2">
          {(browsingPosts.prev <= 0) ?
            <button className="mx-auto px-4 py-1 custom-button" disabled > Prev</button>
            :
            <button className="mx-auto px-4 py-1 custom-button" onClick={onPrevClick} > Prev</button>
        } 
          <div className="">... {browsingPosts.current} ...</div>
          
          {(browsingPosts.next > browsingPosts.total) ?
          <button className="mx-auto px-4 py-1 custom-button" disabled >Next</button>
            :
          <button className="mx-auto px-4 py-1 custom-button" onClick={onNextClick}>Next</button>
            
        }
          </div>
      </div>
    </div>
  )
}

export default Browser;
