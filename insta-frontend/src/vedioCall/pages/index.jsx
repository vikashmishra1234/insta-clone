import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { GetUser, sendEmail } from '../../Components/Api/Services';
import ContextProvider from '../../Components/Context/ContextProvider';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'

const index = () => {
    
const [Name,setName] = useState('error')
const [chat,setChat] = useState(false)
const [Email,setEmail] = useState(null)
const [id,setId] = useState(null)
const {user,setUser,changes} = useContext(ContextProvider);
const {roomId} = useParams();
const navigate = useNavigate();

useEffect(()=>{
   const arr = roomId.split("-5");
 setEmail(arr[2]);
 setId(arr[0])
  const getUser = async()=>{
      let user = await GetUser(localStorage.getItem("userId"));
      setUser(user.user);  
  }
  getUser()
 
},[roomId])



  useEffect(()=>{
    
    const sendMail = async()=>{
      setName(user.Username)
      
      const res = await sendEmail({
        from:user.Email,
        to:Email,
        subject:`${user.Username} want a video call with you`,
        text:`https://insta-clone-frontend-sooty.vercel.app/room/${id+"-5"+Name+"-5"+Email}`
      });
      if(res.success){
        setChat(true);
      }

    }
   Email&&user?id&&sendMail():''
  },[user,Email,id,Name])
 
  //  arr.map(value=>(
  //   console.log(value)
  //  ))
   
   
    const myMeetings = async(element)=>{
        const appID = 79828477;
      const serverSecret = "50396d795bb3e6a254f1d9b6e1931f3b";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id,Date.now().toString(),Name);
      const zc = ZegoUIKitPrebuilt.create(kitToken);
       zc.joinRoom({
          container:element,
          // sharedLinks:[
          //   {
          //       name:'Copy Link',
          //       url:`http://localhost:5173`
          //   }
          // ],
          scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton:false,
          onReturnToHomeScreenClicked:()=>navigate('/home')
      })
    }
  return (
    <div>
      {
        chat? <div ref={myMeetings} />:<h2>Please Wait...</h2>
      }
     
      </div>
  )
}

export default index