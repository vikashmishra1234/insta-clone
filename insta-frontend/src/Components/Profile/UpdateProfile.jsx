import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import '../../Style/post.css';
import { updateProfile } from '../Api/Services';

const UpdateProfile = () => {

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let form = e.target
        let formData = new FormData(form)
        let formObj = Object.fromEntries(formData.entries());
        let res=await updateProfile(formObj,localStorage.getItem("profileId"));
        if(res.message){
            alert(res.message);
        }
    }
  return (
    <div style={{display:'flex'}}>
        <Sidebar/>
        <section className='update-profile'>
        <form action="" onSubmit={handleSubmit}>
            <h2 style={{width:'100%'}}>update Profile</h2>
            <input name='userName' type="text" placeholder='username' />
            <input name='bio' type="text" placeholder='bio' />
            <input type="submit"  />
        </form>
        </section>

    </div>
  )
}

export default UpdateProfile