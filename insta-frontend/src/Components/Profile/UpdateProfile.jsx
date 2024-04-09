import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import '../../Style/post.css';
import { updateProfile } from '../Api/Services';
import {useNavigate} from 'react-router-dom'

const UpdateProfile = () => {
const Navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let form = e.target
        let formData = new FormData(form)
        let formObj = Object.fromEntries(formData.entries());
        let res=await updateProfile(formObj,localStorage.getItem("profileId"));
        if(res.message){
            alert(res.message);
            Navigate(`/profile?user=${localStorage.getItem("profileId")}`);
        }
    }
  return (
    <div className='home-wrapper'>
        <Sidebar/>
        <section className='update-profile'>
        <form action="" onSubmit={handleSubmit}>
            <h2 style={{width:'100%',textAlign:'center'}}>update Profile</h2>
            <input required name='userName' type="text" placeholder='username' />
            <input required name='bio' type="text" placeholder='bio' />
            <button type="submit" id='button' >Update</button>
        </form>
        </section>

    </div>
  )
}

export default UpdateProfile