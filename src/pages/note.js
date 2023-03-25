import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";

import request, { gql } from "graphql-request"
import { UserContext } from '../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../realm/constants';
import { useNavigate } from "react-router-dom";

import './note.css'

const Note = () => {
  const navigate = useNavigate();
  const { user, userEmailInfo } = useContext(UserContext);
  const [postData, setpostData] = useState({
    title: '',
    description: '',
    tag: '',
    createdAt: new Date()
  });

  const addPostQuery = gql` 
  mutation AddPost ($data: PostInsertInput!) {
    insertOnePost(data:$data) {
      _id
    }
  }
  `;

  const queryVariables = {
    data: {
      title: postData.title,
      description: postData.description,
      tag: postData.tag,
      // author: user.id,
      author: userEmailInfo,
      createdAt: postData.createdAt
    }
  };
  const headers = { Authorization: `Bearer ${user._accessToken}` };


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

  const addPost = async (event) => {
    event.preventDefault();
    if (postData.title.length === 0 || postData.description.length === 0 ) {
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, addPostQuery, queryVariables, headers);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  } 
  
  return (
      <div className="m-3 mt-10 mx-auto md:max-w-[70%] lg:max-w-[716px] custom-container ">
          {/* <form onSubmit={addDetails} className="update__forms"> */}
          <form className="mx-auto flex-row ">
            <h3 className=" text-lg m-3">What's is your story, today?</h3>
            <label className="flex m-3"> Title <span className="required text-red-600"> * </span> </label>
            <div className="m-3">
              <input className=" w-[100%] h-10 custom-input" type="text" name="title" value={postData.title} onChange={onChangeValue}  placeholder=" Title" required />
            </div>
            
            <label className="m-3"> Description <span className="required text-red-600"> * </span> </label>
            <div className="m-3 ">
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
            <label className="flex m-3"> Tag (put '#' mark first example: #Hooray!)</label>
            <div className="m-3">
              <input className=" w-[100%] h-10 custom-input" type="text" name="tag" value={postData.tag} onChange={onChangeValue}  placeholder="Tag"/>
            </div>
            <div className="text-center">
              <button type="submit" className="px-4 py-2 custom-button" onClick={addPost}> Submit  </button>
            </div> 
          </form>
      </div>
  )
}
export default Note