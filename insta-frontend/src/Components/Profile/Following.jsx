import React, { useContext, useEffect, useState } from 'react'
import { getAllFollower } from '../Api/Services'
import '../../Style/feed.css'
import user from '../../assets/user.png'
import ContextProvider from '../Context/ContextProvider'
import {useNavigate} from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

const Following = () => {
   
    const [show,setShow] = useState(false)
    const {following} = useContext(ContextProvider);
    const navigate = useNavigate();
const handleCall=(roomId,userName,userEmail)=>{
    let ok=confirm(`want to chat with ${userName}`);
    if(ok){
        let params = `${roomId+"-5"+userName+"-5"+userEmail}`;
       
        navigate(`/room?param=${params}`);
    }
}
   
  return (
    <div className='home-wrapper'>
        <Sidebar/>
        
        {
            following&&following.map((element)=>(
                
                <div key={element._id} className='following' onClick={()=>handleCall(element._id,element.userName,element.userEmail)}>
                   {
                show?<img src={user} alt="img" />:<img src={`https://insta-clone-knbn.onrender.com/profiles/${element.profileImage}`} onError={()=>setShow(true)} alt="img" />
              }
                   
                    <span>{element.userName}</span>
                </div>
            ))
        }
        <h2 style={{textAlign:'center'}}>Your following</h2>
    </div>
  )
}

export default Following