import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/user.context'
import { request, gql } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '../realm/constants'
import { useParams, useNavigate } from 'react-router-dom'

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";


const Edit = () => {
  const { user } = useContext(UserContext)
  const [postData, setpostData] = useState({
    title: '',
    description: '',
    tag: '',
    createdAt: new Date()
  });

  const {postId: postId} = useParams();
  const navigate = useNavigate();

  const getPostQuery = gql`
query getPost($query: PostQueryInput!) {
  post(query: $query) {
  _id
  title
  description
  tag
  createdAt
  } 
}
`;
  const queryVariables = { query: {_id: postId} };
  const headers = { Authorization: `Bearer ${user._accessToken}` }
  
  const loadPosts = async () => {
    console.log("loadPosts")
    const resp = await request(GRAPHQL_ENDPOINT,
      getPostQuery,
      queryVariables,
      headers
    );
    console.log(resp);
    
    const { title, description, tag, createdAt } = resp.post;
    setpostData({ title, description, tag, createdAt });

  }

  
  useEffect(() => {
    loadPosts();
  }, []);  

  const onChangeValue = (e) => {
    setpostData({
      ...postData,
      [e.target.name]:e.target.value
    });
  }

  const ondescription = (value) => {
    setpostData({ ...postData,
      description:value
    });
  }

  const updatePost = async (event) => {
    event.preventDefault();
    const { title, description, tag, createdAt } = postData;

    const editExpenseMutation = gql`
    mutation EditPost($query: PostQueryInput!, $set: PostUpdateInput!) {
      updateOnePost(query: $query, set: $set) {
        _id
      }
    }
    `;

    const queryAndUpdateVariables = {
      query: {
        _id: postId
      },
      set: {
        title: title,
        description: description,
        tag: tag,
        createdAt: createdAt
      },
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
      await request(GRAPHQL_ENDPOINT, editExpenseMutation, queryAndUpdateVariables, headers);

      // Navigating to homepage once the updates are sent and confirmed.
      navigate(`/`);
    } catch (error) {
      alert(error)
    }

  }



  return (
    <div className="m-3 mt-10 mx-auto sm:max-w-[70%] custom-container ">
      {console.log(postId)}
        <form className="mx-auto flex-row ">
          <h3 className=" text-lg m-3">Edit your story here</h3>
          <label className="flex m-3"> Title <span className="required text-red-600"> * </span> </label>
          <div className="m-3">
            <input className=" w-[100%] h-10" type="text" name="title" value={postData.title} onChange={onChangeValue}  placeholder=" Title" required />
          </div>
          
          <label className="m-3"> Description <span className="required text-red-600"> * </span> </label>
          <div className="m-3">
            <EditorToolbar toolbarId={'t1'} />
            <ReactQuill
              theme="snow"
              value={postData.description}
              onChange={ondescription}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />
          </div>
          <label className="flex m-3"> Tag </label>
          <div className="m-3">
            <input className=" w-[100%] h-10" type="text" name="tag" value={postData.tag} onChange={onChangeValue}  placeholder="Tag"/>
          </div>
          <div className="text-center">
            <button type="submit" className="px-4 py-2 text-gray-600 bg-gray-400" onClick={updatePost}> Update  </button>
          </div> 
        </form>
    </div>
)

}

export default Edit
