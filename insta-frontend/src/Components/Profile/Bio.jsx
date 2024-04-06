import React, { useContext, useState } from "react";
import "../../Style/post.css";
import { useNavigate } from "react-router-dom";
import { uploadProfile } from "../Api/Services";
import ContextProvider from "../Context/ContextProvider";
import user from '../../assets/user.png'

const Bio = (props) => {
  const { setProfile,setChanges,changes, profile } = useContext(ContextProvider);
  const [show,setShow] = useState(false)

  const Navigate = useNavigate();
  const handleChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("profileId", props.profileId);
    formData.append("userId", localStorage.getItem("userId"));
    let resp = await uploadProfile(formData);
    alert(resp.message);
    setChanges(!changes);
    setProfile(!profile);
  };
 console.log(props.image)
  return (
    <div>
      {
        <div className="profile">
          <div className="icon">
            <label htmlFor="dp">
              
              {
                show?<img src={user} alt="img" />:<img src={`https://insta-clone-knbn.onrender.com/profiles/${props.image}`} onError={()=>setShow(true)} alt="img" />
              }

            </label>

         {props.userId==localStorage.getItem("userId")&&<input
              onChange={handleChange}
              style={{ display:'none' }}
              type="file"
              id="dp"
            />}
          </div>
          <div className="about">
            <div className="line">
              <span>{props.Username}</span>
             {
props.userId==localStorage.getItem("userId")&&
             <button onClick={() => Navigate("/update/profile")}>
                Edit Profile
              </button>
             } 
             {
              props.userId==localStorage.getItem("userId")&&
              <button>Setting</button>

             }
            </div>
            <section>
              <small style={{ marginLeft: "10px" }}>
                {" "}
                {props.posts} posts{" "}
              </small>
              <small style={{ marginLeft: "10px" }}>
                {props.follower} follower
              </small>
              <small style={{ marginLeft: "10px" }}>
                {props.following} following
              </small>
            </section>
            <section>
              <div>
                <p>{props.bio}</p>
              </div>
         
            </section>
          </div>

        </div>
      }
    </div>
  );
};

export default Bio;
