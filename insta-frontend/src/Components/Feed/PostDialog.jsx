import React, { useEffect, useState } from "react";
import { getAllCommet } from "../Api/Services";
import user from '../../assets/user.png'
import "../../Style/post.css";

const PostDialog = ({ postId, image ,setShow}) => {
  const [allComment, setComments] = useState(null);
  useEffect(() => {
    const getCommets = async () => {
      const res = await getAllCommet(postId);
      console.log(res)
      setComments(res.Comments);
    };
    getCommets();
  }, []);
  return (
    <main className="post-dialog">
      <div className="dialog-content">
        <section className="dialog-image">
          <img src={`https://insta-clone-knbn.onrender.com/images/${image}`} alt={`${image}`} />
        </section>
        <section className="dialog-comments">
          {
            
           allComment&&allComment.map((comment, index) => (
                <div key={index} style={{margin:'10px'}} className="post-comment" >
                
                  <img style={{borderRadius:'50%'}} height={'50px'} width={'55px'} src={user} alt={`profile`} />
                  
                    <strong >{comment.userName}</strong>
                    <small >{comment.Comment}</small>
                  
                  
                </div>
              ))
            }
        </section>
      </div>
      <button onClick={()=>setShow(false)}>Close</button>
    </main>
  );
};

export default PostDialog;
