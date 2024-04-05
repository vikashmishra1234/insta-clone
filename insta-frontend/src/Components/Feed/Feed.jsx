import React from 'react'
//import '../../Style/feed.css'
import Post from './Post'


const Feed = ({Posts}) => {
console.log(Posts)
  return (
    <div>
      {
        Posts&&Posts.map((post,index)=>(
          // console.log(post)
          <Post
          key={index}
          id={post._id}
          
          Profile={post.Profile}
          Username={post.Username}
          image={post.image}
          Comments={post.Comments}
          Likes={post.Likes}
          location={post.location}
          caption={post.caption}
    
          />
        ))
      }
    </div>
  )
}

export default Feed
