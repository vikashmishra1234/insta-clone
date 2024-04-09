import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import {
  addFollower,
  followCheck,
  getAllFollower,
  getAllPost,
  getProfile,
  removeFollow,
} from "../Api/Services";
import { useLocation } from "react-router-dom";
import ContextProvider from "../Context/ContextProvider";
import Bio from "./Bio";
import Allimages from "./Allimages";
import "../../Style/feed.css";

const Profile = ({ admin }) => {
  const { profile, setUser,setFollowing,following,changes,setChanges } = useContext(ContextProvider);
  const [Profile, setProfile] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [notUser, setNotUser] = useState(false);
  const [follow, setFollow] = useState(false);
  const [follows, setFollows] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const receivedData = params.get("user");

  
  useEffect(() => {
    const allPosts = async () => {
    
      let res = await getAllPost(receivedData);
      setAllPosts(res.Posts);
      if (localStorage.getItem("userId") === Profile.userId) {
        setNotUser(false);
      }
      else{
        setNotUser(true)
      }
    };
   Profile&&allPosts();
  }, [localStorage.getItem("userId"),Profile]);

  useEffect(() => {
    const getProfileData = async () => {
      const params = receivedData+"-1"+localStorage.getItem("userId")
      let res = await getProfile(params);
      setFollows(res.Follows)
      setProfile(res.Profile);
    
      
    };
    getProfileData();
  }, [profile, changes]);

  useEffect(()=>{
    const getFollowingAdmin = async()=>{
        const res = await getAllFollower(localStorage.getItem("userId"));
      
        setFollowing(res.Following)
    }
    const getFollowingUser = async()=>{
        const res = await getAllFollower(Profile.userId);
      
       
        setFollowing(res.Following)
    }
    
   Profile&&(localStorage.getItem("userId") == Profile.userId)?Profile&&getFollowingAdmin():Profile&&getFollowingUser();
},[changes,Profile])

  const handleClick = async () => {
  if(admin._id){

    const data = {
      userId: localStorage.getItem("userId"),
      profileId: Profile._id,
    };
    await addFollower(data);
    setChanges(!changes);
  }
  };


  const Removefollower = async () => {
    if(admin._id){

      const data = {
        userId: admin._id,
        profileId: Profile._id,
      };
      console.log("remove");
      follows && (await removeFollow(data));
      setChanges(!changes);
    }
  };

  return (
    <div className="home-wrapper">
      <Sidebar />
      <div style={{ width: "100%" }}>
        <div>
          {following&&Profile&&allPosts&& (
            <Bio
           userProfileId={receivedData}
            setChanges={setChanges}
              profileId={Profile._id}
              Username={Profile.userName}
              posts={allPosts.length}
              follower={Profile.follower}
              following={following.length}
              bio={Profile.bio}
              userId={Profile.userId}
              image={Profile.profileImage}
            />
          )}

          {notUser && (
            <button
              onClick={() => (follows ? Removefollower() : handleClick())}
              className={follows ? "btn-1" : "btn"}
            >
              {follows ? "following" : "follow"}
            </button>
          )}
        </div>
        <div className="images-container">
          {allPosts&&allPosts.length===0?<h3>No Post Found</h3>:allPosts&&
            allPosts.map((post, index) => (
              <Allimages key={index} image={post.image} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
