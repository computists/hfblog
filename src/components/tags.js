import React from 'react'

const Tags = ({tags, afterUpdate, selectedTags, setSelectedTags}) => {
  // Remove duplicated elements
  const uniqueTags = Array.from(new Set(tags));
  // Remove duplicated selectedTags(what for? when tag is clicked from outside of tags(e.g, articleForm))
  selectedTags = Array.from(new Set(selectedTags));
  setSelectedTags(selectedTags);
  
  const onClickTags = (e) => {
    const value = e.target.innerText;

    // check whether value is already selected before or not.
    if (selectedTags.filter(tag => tag === value).length === 0) {
      setSelectedTags([...selectedTags, value])
      afterUpdate();
    } else {
      console.log("Tags is already chose")
    }
  }

  const onClearTags = () => {
    setSelectedTags([]);
    afterUpdate();
  }
  
  const onRemoveOneFilter = (e) => {
    console.log("remove")
    //extract filter Name from parent
    const parentName = e.target.parentElement.innerText;
    let filterName = "";
    if(parentName.endsWith("X")) {
      filterName = parentName.substr(0,parentName.length-1)
      setSelectedTags(selectedTags.filter((tag) => {
        return tag !== filterName
      }
       ))
      afterUpdate();
    } else {
      console.log("Filter Name has error")
    }

  }

  return (
    <div>
      <div className="mx-auto my-10 custom-container break-all">
        <div className="mb-3 flex flex-col ">
          <button className="px-4 py-1 custom-button" onClick={onClearTags}>Clear Tags</button>
          {
            (selectedTags.length > 0) ?
              selectedTags.map(sTag => <button className='px-4 py-1 my-1 tag-button'>{sTag}<span className='text-red-600' onClick={onRemoveOneFilter}>X</span></button> )
            :
              <span className="px-4 py-1 ">No Tag selected</span>
          }
        </div>
        <hr className='my-2'></hr>
        <div className="">
          {
            uniqueTags.map(tag => <button className='mx-2 px-2 my-1 tag-button' id={tag} onClick={onClickTags}>{tag}</button> )
          }
        </div>
      </div>
      
    </div>
  )
}

export default Tags;
