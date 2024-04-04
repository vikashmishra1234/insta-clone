import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import "../../Style/post.css";
import { updatePosts } from "../Api/Services";
import AddComent from "./AddComent";
import PostDialog from "./PostDialog";
import user from '../../assets/user.png'

const Post = (props) => {
  const [likes, setLikes] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  let intlike = parseInt(props.Likes);
  console.log(props.Likes,"proslike")
  const updateLikes = async () => {
    const data = {
      Likes: 1 + intlike,
    };
   setLikes(likes+1);
    const res = await updatePosts(data, props.id);

  
   
  };
  const showDialog = async () => {
    setShow(!show);
  };
  const handleError = ()=>{
    setError(true)
  }

  return (
    <main className="wrapper">
      <section>
        <div
        className="post-wrapper"
          style={{
            display: "flex",
            fontSize: "20px",
            gap: "20px",
            padding: "6px",
            paddingLeft: "3px",
            alignItems: "center",
          }}
        >

         { error?<img
            src={user}
           
            alt={'img'}
            height={"50px"}
            style={{ width: "55px", borderRadius: "50%" }}
          />:
          <img
            src={`https://insta-clone-knbn.onrender.com/userProfiles/${props.Profile}`}
            onError={handleError}
            alt={'img'}
            height={"50px"}
            style={{ width: "55px", borderRadius: "50%" }}
          />}

          {props.Username} <br />
          {props.location}
        </div>
      </section>
      <section className="post-image">
        <img
          src={`https://insta-clone-knbn.onrender.com/images/${props.image}`}
          alt={props.image}
          height={"400px"}
          width={"400px"}
        />
      </section>
      <section>
        <div className="icons">
          <CiHeart onClick={updateLikes} size={30} />
          <FaRegComment onClick={showDialog} size={22} />
          <RiShareForwardLine size={30} />
          <div style={{ textAlign: "end", width: "70%" }}>
            <CiSaveDown2 size={30} />
          </div>
        </div>
        <small style={{ fontSize: "15px" }}>Likes: {intlike+likes}</small>
        <section className="lower">
          <div style={{ fontSize: "17px" }}>
            {props.Username}-: {props.caption}
          </div>
          <div style={{ fontSize: "15px" }}>
            view all {props.Comments} comments
          </div>
        </section>
      </section>
      <div style={{ fontSize: "15px" }}>{<AddComent id={props.id} />}</div>
      <div>
        {show && (
          <PostDialog setShow={setShow} image={props.image} postId={props.id} />
        )}
      </div>
    </main>
  );
};

export default Post;
// useEffect(()=>{
//   const importImages=async()=>{
//     const imageImports = import.meta.glob('../../images/*');
//     const importedImages = await Promise.all(
//       recentPost.map(async (post) => {
//         const imagePath = `../../images/${post.image}`;
//         if (imageImports[imagePath]) {
//           const { default: image } = await imageImports[imagePath]();
//           return image;
//         } else {
//           console.warn(`Image not found: ${imagePath}`);
//           return null;
//         }
//       })
//     );
//     setImages(importedImages.filter(image => image !== null));
//     console.log(images)
//   }
//   importImages()
// },[recentPost])
