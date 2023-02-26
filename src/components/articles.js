import React, { useContext, useState, useEffect } from 'react'
import request, { gql } from 'graphql-request';
import { UserContext } from '../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../realm/constants';
import ArticleForm from './articleForm';

const Articles = () => {

  const { user } = useContext(UserContext);
  console.log(user)
  const [posts, setPosts] = useState([]);
  var headers = {};

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

  try {
    headers = { Authorization: `Bearer ${user._accessToken}` }
  } catch {
    headers = {};
  }
  console.log(headers)

  const loadPosts = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllPostsQuery,
      queryVariables,
      headers
    );
    console.log(resp);
    setPosts(_ => resp.posts.map(post => ({ ...post, key: post._id, afterDelete })));
  };

  useEffect(() => {
    loadPosts();
  }, []);  

  const afterDelete = () => {
    loadPosts();
  }

  return (
    <div>
      <div className="mx-auto">
        {
          posts.map(post => <ArticleForm {...post} /> )
        }
      </div>
        
    </div>
  )
}

export default Articles;