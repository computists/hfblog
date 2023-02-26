import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [postsCont, setPostsCont] = useState([]);
    const [tagsCont, setTagsCont] = useState([]);

    return <PostContext.Provider value={{ postsCont, setPostsCont, tagsCont, setTagsCont }}>
    {children}
  </PostContext.Provider>;

}

