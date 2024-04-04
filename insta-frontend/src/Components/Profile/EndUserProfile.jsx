import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { getAllPost, getProfile } from "../Api/Services";
import ContextProvider from "../Context/ContextProvider";
import { useLocation } from 'react-router-dom';
import Bio from "./Bio";
import Allimages from "./Allimages";
import '../../Style/feed.css'

const EndUserProfile = (props) => {
  const { profile } = useContext(ContextProvider);
  const [Profile, setProfile] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const receivedData = params.get('user');
  
  

  useEffect(() => {
    const allPosts = async () => {
      let res = await getAllPost(receivedData);
      console.log(res)
      setAllPosts(res.Posts);
    };
    allPosts();
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      let res = await getProfile(receivedData);
      console.log(res)
     setProfile(res.Profile)
    };
    getProfileData();
  }, [profile]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <div>
          {Profile && (
            <Bio
           
            profileId={Profile._id}
              Username={Profile.userName}
              posts={Profile.posts}
              follower={Profile.follower}
              following={Profile.following}
              bio={Profile.bio}
              image={Profile.profileImage}
            />
          )}
        </div>
        <div className="images-container" >
       
            {allPosts &&
              allPosts.map((post, index) => (
                
            <Allimages key={index} image={post.image} />
              ))}
         
        </div>
      </div>
    </div>
  );
};

export default EndUserProfile;
