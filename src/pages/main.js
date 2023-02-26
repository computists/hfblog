import React, { useContext, useState, useEffect } from 'react'
import request, { gql } from 'graphql-request';
import { UserContext } from '../contexts/user.context';

import { GRAPHQL_ENDPOINT } from '../realm/constants';

import Tags from '../components/tags';
import Articles from '../components/articles';
import Browser from '../components/browser';
import ArticleForm from '../components/articleForm';

var selectedPosts = [];
const setSelectedPosts = (value) => {
  selectedPosts = value;
}

var selectedTags = [];
const setSelectedTags = (value) => {
  selectedTags = value;
}


const Main = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [tagsPosts, setTagsPosts] = useState([]);
  // const [selectedTags, setSelectedTags] = useState([]);
  //const [selectedPosts, setSelectedPosts] = useState([]);

  const getAllPostsQuery = gql`
query {
  posts(sortBy: CREATEDAT_DESC) {
  _id
  title
  description
  tag
  createdAt
  } 
}
`;
  const queryVariables = {};
  var headers = {};
  try {
    headers = { Authorization: `Bearer ${user._accessToken}` }
  } catch {
    headers = {};
  }

  const loadPosts = async () => {
    console.log("loadPosts")
    setTagsPosts([]);
    
    // get posts data from Atlas
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllPostsQuery,
      queryVariables,
      headers
    );
    console.log(resp);
    setPosts(_ => resp.posts.map(post => ({ ...post, key: post._id, afterDelete })));

    // when tag data include two more tags, splits(with '#') tags and add to array separately
    resp.posts.map((post) => {
      let tagSplit = post.tag.split("#");
      if(tagSplit.length > 2) {
        tagSplit.shift()
        tagSplit.map((data) => {
          return setTagsPosts((prev) => {
            return [...prev, '#'.concat(data)]
          })  
        })
      } else { 
        // when tag data has only one tag
        return setTagsPosts((prev) => {
          return [...prev, post.tag]
        })
      }
    })

    // set filtered posts
    if(selectedTags.length === 0) {
      setSelectedPosts(posts)
      console.log('111')
    } else {
      const aaaa = selectedTags.map((selectedTag) => (
        posts.filter((post) => {
          return post.tag.includes(selectedTag)
        })
      ))
      setSelectedPosts(aaaa)
      console.log('222')
    }

  };
  useEffect(() => {
    loadPosts();
  }, []);  

  const afterDelete = () => {
    loadPosts();
  }

  const onTagClick = (value) => {
    console.log("Tag Click")
    console.log(selectedTags.filter(tag => tag === value).length)
    // need to check whether tag is duplicate.
    if (selectedTags.filter(tag => tag === value).length === 0) {
      setSelectedTags([...selectedTags, value])
      loadPosts();
    } else {
      console.log("Tags is already chose")
    }
  }

  const onCancelFilter = () => {
    setSelectedPosts(posts);
    setSelectedTags([]);
    loadPosts();
  }
 
  return (
    <div className='flex-col md:flex md:flex-row max-w-[1024px] mx-auto justify-center'>
      <div className='max-w-[95%] md:max-w-[20%] mx-auto'>
        <button className="" onClick={onCancelFilter}>cancel filter</button>
        <div className="">
          {
            (selectedTags.length === 0) ?
            <span className="">No filter</span>
            :
            <span className="">{selectedTags}</span>
            
          }
        </div>
        {
          console.log(selectedPosts)
        }
        <div className="">
          {
            <Tags tags={tagsPosts} onTagClick={onTagClick} />  
          }
        </div>
        
      </div>
      <div className='max-w-[95%] md:max-w-[70%] mx-auto'>
        <Browser />
        {
          // posts.map(post => <ArticleForm {...post} /> )
          selectedPosts.map(post => <ArticleForm {...post} /> )
        }
      </div>
    </div>
  )
}

export default Main;