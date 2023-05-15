import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
export const PostsContext = createContext()

export default function PostsContextProvider({children}) {


    const [allUser, setUsers] = useState([])
    //posts infos
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [createdAt, setCreatedAt] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorImg, setauthorImg] = useState("");

    //all Posts
    const [posts, setPosts] = useState([]);

    const allPosts = async () => {
        const data = await fetch('http://localhost:7000/api/posts');
        const resp = await data.json();
        setPosts(resp);
    }
    const dateRegistration = async () => {
        const time = new Date()
        const date = time.getUTCDate()
        const month = time.getMonth() + 1
        const hours = time.getHours()
        const minutes = time.getMinutes()

        const dateNow = `${date}/${month} at ${hours}:${minutes}`;
        return dateNow.toString();
    }

    const IdentifyTheUserName = async (id) => {
        const response = await fetch('http://localhost:7000/api/users');
        const data = await response.json();
        setUsers(data)

        const user = data.find((u) => u._id == id.id);
        setauthorImg(user.img)
        return user.name
    }


    const IdentifyTheUserImg = async (id) => {
      const response = await fetch('http://localhost:7000/api/users');
      const data = await response.json();
      setUsers(data)

      const user = data.find((u) => u._id == id.id);
      setauthorImg(user.img)
      return user.img
  }

    const addPost = async (id,setOpen) => {
        const date = await dateRegistration();
        setCreatedAt(date);
        
        const name = await IdentifyTheUserName(id);
        const img = await IdentifyTheUserImg(id)
        if (!name) {
          console.log('User not found');
          return;
        }
        setAuthorName(name);
        console.log("resumeprofilpost: ",id);
        setauthorImg(img)

        const post = {
          title,
          content,
          authorName: name, // Assign the retrieved name to authorName
          authorImg,
          createdAt
        };
        
        if (title && content ) { // Check if authorName is not empty
          setPosts((prev) => [post, ...prev]);
        } else {
          alert('Field is empty');
          return;
        }
        
        fetch('http://localhost:7000/api/addPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
        })
          .then((res) => res.json())
          .then(data => {
            console.log(data);
          });
          setOpen(false)
          alert('post sent !')
      };


    const value = {
        posts,
        allPosts,
        setPosts,

        setContent,
        content,
        setTitle,
        setCreatedAt,
        setAuthorName,
        setauthorImg,

        dateRegistration,
        addPost,

        IdentifyTheUserName,
        IdentifyTheUserImg
    }
    {
        console.log("title=>", title);
        console.log("content=>", content);
        console.log("authorName=>", authorName);
        console.log("authorImg=>", authorImg);
        console.log("createdAt=>", createdAt);
    }

    return (
        <>
            <PostsContext.Provider value={value}>
                {children}
            </PostsContext.Provider>
        </>
    )
}
