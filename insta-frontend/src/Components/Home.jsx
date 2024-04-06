import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Feed from './Feed/Feed'
import { GetUser, createProfile, getRecent, getposts } from './Api/Services'
import ContextProvider from './Context/ContextProvider'
import '../Style/feed.css'

const Home = () => {
  const {setUser,changes,user} = useContext(ContextProvider);
  const [Posts,setPosts] = useState(null);
  const [allPosts,setAllPost] = useState(null);
  const [userPost,setUserPost] = useState(null)
  useEffect(()=>{
      const getPosts=async()=>{
        if(user!=null){
          
          let posts= await getposts(user._id)
      console.log("all posts",posts)
          setAllPost(posts)    
            
        }
        
      }
      user&&getPosts();
  },[user,changes])
  useEffect(()=>{
    const profileCreate=async()=>{
      
    const data={
      userId:user._id,
      follower:0,
      following:0,
      userName:user.Username,
      profileImage:'vik',
      posts:0,
      bio:''
    }    
   let pro=  await createProfile(data);
   
   
     
    }
   user&&profileCreate();
  },[user]);
 

  useEffect(()=>{
    const getUser = async()=>{
        let user = await GetUser(localStorage.getItem("userId"));
        setUser(user.user);  
    }
    getUser()
   
  },[])
  // useEffect(()=>{
  //   if(allPosts){
     
  //     let posts = [...Posts,...allPosts.POST]
  //     //remove duplicates
  //     // let uniqueArray = Object.values(posts.reduce((acc, cur) => {
  //     //   acc[cur._id] = cur;
  //     //   return acc;
  //     // }, {}));
  //     console.log(uniqueArray)
  //     setUserPost(uniqueArray)
      
  //   }
  // },[allPosts,Posts])
  return (
    <div  style={{display:'flex'}}>
     <Sidebar />
     <div className='feed-container'>

     {allPosts?<Feed Posts={allPosts.POST}/>:<h2>click on the create button upload images</h2>}
     </div>
    </div>
  )
}

export default Home
