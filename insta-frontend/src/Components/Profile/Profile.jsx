import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import {
  addFollower,
  followCheck,
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
  const { profile, setUser,changes,setChanges } = useContext(ContextProvider);
  const [Profile, setProfile] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [notUser, setNotUser] = useState(false);
  const [follow, setFollow] = useState(false);
  const [change, setChange] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const receivedData = params.get("user");

  useEffect(() => {
    const checkFollow = async () => {
      setUser(admin);
      if (admin) {
        const data = {
          userId: admin._id,
          profileId: Profile._id,
        };
        let res = await followCheck(data);

        setFollow(res.follow);
      }
    };

    Profile && checkFollow();
  }, [Profile, changes]);
  useEffect(() => {
    const allPosts = async () => {
      let res = await getAllPost(receivedData);
      setAllPosts(res.Posts);
      if (localStorage.getItem("userId") == receivedData) {
        setNotUser(true);
      }
    };
    allPosts();
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      let res = await getProfile(receivedData);
      
      setProfile(res.Profile);
    
      localStorage.setItem("profileId", res.Profile._id);
    };
    getProfileData();
  }, [profile, changes]);

  const handleClick = async () => {
  if(admin._id){

    const data = {
      userId: admin._id,
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
      follow && (await removeFollow(data));
      setChanges(!changes);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <div>
          {Profile && (
            <Bio
            setChanges={setChanges}
              profileId={Profile._id}
              Username={Profile.userName}
              posts={Profile.posts}
              follower={Profile.follower}
              following={Profile.following}
              bio={Profile.bio}
              userId={Profile.userId}
              image={Profile.profileImage}
            />
          )}

          {!notUser && (
            <button
              onClick={() => (follow ? Removefollower() : handleClick())}
              className={follow ? "btn-1" : "btn"}
            >
              {follow ? "following" : "follow"}
            </button>
          )}
        </div>
        <div className="images-container">
          {allPosts &&
            allPosts.map((post, index) => (
              <Allimages key={index} image={post.image} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
