import React, { useContext, useState } from 'react';
import '../../Style/feed.css'
import { ImgeUpload, updatePost } from '../Api/Services';
import ContextProvider from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const UploadPost = ({setForm}) => {
    const [image,setImage]=useState();
    const[post,setPost] = useState()
    const {setRecent,user,setChanges,changes,recentPost} = useContext(ContextProvider);
    const Navigate = useNavigate();
    
    const uploadImage = async(e)=>{
        setImage(e.target.files[0])
        
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const formData = new FormData();
        formData.append("image",image)
        formData.append("caption",post.caption)
        formData.append("location",post.location);
        formData.append("userId",localStorage.getItem("userId"));
        formData.append("Username",user.Username);
        formData.append("Likes",0);
        formData.append("Profile","mishra")
        
        let res=await ImgeUpload(formData);
        setChanges(!changes)
        Navigate('/home');
        
        if(res.message){
            alert(res.message);
            await updatePost(localStorage.getItem("profileId"));
            setChanges(!changes)
            
        }
        setRecent([...recentPost,...res.recent]);
        setForm(false);
        setImage('');
        setPost('');
        
    }
   
  
  return (
  <>
   <form action="" className='upload' onSubmit={handleSubmit}>
    <div>
        <h2>Upload Post</h2>
    </div>
    <input required type="file" onChange={uploadImage} />
    <input required name='caption' onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})} placeholder='caption' type="text" />
    <input required name='location' onChange={(e)=>setPost({...post,[e.target.name]:e.target.value})} placeholder='location' type="text" />
    <button type='submit'>sum</button>
   </form>
  </>

  )
}

export default UploadPost;
