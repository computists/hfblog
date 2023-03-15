import React, { useContext, useState, useEffect } from 'react'
import request, { gql } from 'graphql-request';
import { UserContext } from '../contexts/user.context';

import { GRAPHQL_ENDPOINT } from '../realm/constants';

import Tags from '../components/tags';
// import Articles from '../components/articles';
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

var browsingPosts = {posts:[], prev:0, current:1, next:0, total:0};
const setBrowsingPosts = (value) => {
  browsingPosts = value;
}


const Main = () => {
  const { user } = useContext(UserContext);
  const pageCount = 5;

  const [tagsPosts, setTagsPosts] = useState([]);
  
  const getAllPostsQuery = gql`
query {
  posts(sortBy: CREATEDAT_DESC) {
  _id
  title
  description
  tag
  author
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
    setTagsPosts([]);
    setSelectedPosts([]);
      
    // get posts data from Atlas
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllPostsQuery,
      queryVariables,
      headers
    );
    
    // setPosts(_ => resp.posts.map(post => ({ ...post, key: post._id })));

    // set filtered posts
    if(selectedTags.length === 0) {
      setSelectedPosts(resp.posts)
      
    } else {
      // the problem of below codes is there is an array inside of array cause filter is inside of map
      // It causes diffrent structure between posts and selectedPosts (array vs array inside array)
      const aaaa = selectedTags.map((selectedTag) => (
        resp.posts.filter((post) => {
          return post.tag.includes(selectedTag)
        })
      ))
      
      aaaa.map((aaa) => {
        aaa.map((aa) => {
          setSelectedPosts([...selectedPosts, aa])
        })
      })

      // remove duplication
      setSelectedPosts(Array.from(new Set(selectedPosts)));
    }

    // selectedPosts data transform for browsing data
    // showing only certain posts in a page
    // var browsingPosts = {posts:[], prev:0, current:1, next:0, total:0};
    browsingPosts.total = Math.ceil(selectedPosts.length / pageCount);
    if (browsingPosts.current > browsingPosts.total) {
      browsingPosts.current = browsingPosts.total;
    }
    if (browsingPosts.current <= browsingPosts.total) {
      browsingPosts.next = browsingPosts.current + 1;
    }
    if (browsingPosts.current -1 >= 0) {
      browsingPosts.prev = browsingPosts.current -1
    }

    let firstSlice = 0;
    let lastSlice = 0;
    if ((browsingPosts.current - 1)* pageCount < selectedPosts.length) {
      firstSlice = (browsingPosts.current - 1)* pageCount
    } else {
      firstSlice = 0
    }
    if(browsingPosts.current * pageCount <= selectedPosts.length) {
      lastSlice = browsingPosts.current * pageCount;
    } else {
      lastSlice = selectedPosts.length+1;
      
    }
    
    browsingPosts.posts = selectedPosts.slice(firstSlice, lastSlice);
    
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


  };
  useEffect(() => {
    loadPosts();
  }, []);  

  const afterUpdate = () => {
    loadPosts();
  }

  const scrollToDiv = (id) => {
    const node = document.getElementById(id);
    node.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const scrollTop = () => {
    const node = document.getElementById("top");
    node.scrollIntoView({
      behavior: 'smooth'
    })
  }
 
  return (
    <div className='flex-col md:flex md:flex-row max-w-[1024px] mx-auto justify-center' id='top'>
      <div className='max-w-[95%] md:max-w-[20%] mx-auto'>
        <div className="">
          {
            <Tags tags={tagsPosts} afterUpdate={afterUpdate} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />  
          }
        </div>
      </div>
      
      <div className='max-w-[95%] md:w-[70%] mx-auto'>
        {
          (!user) ?
          <div className="mx-auto my-10 custom-container text-center">Please Login.</div>
          :
          <Browser browsingPosts={browsingPosts} setBrowsingPosts={setBrowsingPosts} afterUpdate={afterUpdate} scrollToDiv={scrollToDiv}/>
        }
        
        <div>
          {
            // posts.map(post => <ArticleForm {...post} /> )
            // selectedPosts.map(post => <ArticleForm {...post} /> )
            browsingPosts.posts.map(post => <ArticleForm {...post} afterUpdate={afterUpdate} selectedTags={selectedTags} setSelectedTags={setSelectedTags} scrollTop={scrollTop} /> )
          }
        </div>
      </div>
    </div>
  )
}

export default Main;