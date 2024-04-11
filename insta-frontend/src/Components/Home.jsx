import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed/Feed";
import { GetUser, createProfile, getRecent, getposts } from "./Api/Services";
import ContextProvider from "./Context/ContextProvider";
import "../Style/feed.css";

const Home = () => {
  const { setUser, changes, user } = useContext(ContextProvider);
  const [Posts, setPosts] = useState(null);
  const [allPosts, setAllPost] = useState(null);
  const [profileId,setProfileId] = useState(null)
  const [userPost, setUserPost] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      if (user != null) {
        let posts = await getposts(user._id);

        setAllPost(posts);
      }
    };
    user && getPosts();
  }, [user, changes]);
  useEffect(() => {
    const profileCreate = async () => {
      const data = {
        userEmail: user.Email,
        userId: user._id,
        follower: 0,
        following: 0,
        userName: user.Username,
        profileImage: "vik",
        posts: 0,
        bio: "",
      };
      let pro = await createProfile(data);
      localStorage.setItem("profileId",pro.Profile._id);
      console.log(pro.Profile._id)
      setProfileId(pro.Profile._id)
      
    };
    user && profileCreate();
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser(localStorage.getItem("userId"));
      setUser(user.user);
    };
    getUser();
  }, []);

  return (
    <div className="home-wrapper">
      <Sidebar profileId={profileId} />
      <div className="feed-container">
        {allPosts && allPosts.POST.length > 0 ? (
          <Feed Posts={allPosts.POST} />
        ) : (
          <h2>click on the create button upload images</h2>
        )}
        {/* {allPosts?<Feed Posts={allPosts.POST}/>:<h2 style={{color:"pink"}}> welcome you,start sharing post by clicking on the create button</h2>} */}
      </div>
    </div>
  );
};

export default Home;
