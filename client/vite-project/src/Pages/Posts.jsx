import React, { useContext, useEffect } from 'react';
import { PostsContext } from '../Context/PostsContext';

export default function Posts() {
  const { allPosts, posts } = useContext(PostsContext);

  useEffect(() => {
    allPosts();
  }, []);

  // Reverse the posts array to display them in the correct order
  const reversedPosts = [...posts].reverse();
  {
    console.log(reversedPosts);
  }
  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {reversedPosts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            {
              post.authorImg ? <img className="profile-img" src={post.authorImg} alt="Profile" /> :
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" style={{ width: 50 }} />
            }

            <div className="post-header-info">
              <h3 className="post-author">@{post.authorName}</h3>
              <p className="post-date">{post.createdAt}</p>
            </div>
          </div>
          <div className="post-content">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-text">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
