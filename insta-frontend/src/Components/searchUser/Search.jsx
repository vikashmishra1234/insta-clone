import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import { searchUser } from '../Api/Services';
import User from './User';
import EndUserProfile from '../Profile/EndUserProfile';
import { useNavigate } from 'react-router-dom';
import '../../Style/feed.css'

const Search = () => {
    const [user,setUser] = useState(null);
    const [users,setUsers]  = useState(null);
    const [show,setShow] = useState(false);
    const [user_id,setUserId] = useState()
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] = useState('no user found with this user name')
    const Navigate= useNavigate();

   
    const handleSearch = async()=>{
        if(user){
            alert(user);
          let Users= await searchUser(user);
          setUsers(Users.users);
          if(Users.users.length<=0){
            setShowMessage(true)
          }
         
        }
    }
    const handleClick = (id)=>{
      setUserId(id);
      setShow(!show);
      Navigate(`/profile?user=${id}`)
      
    }
  return (
    <>
   <div style={{display:'flex'}} >
    <Sidebar/>
    <main className='search-main'>
        <section>
            <input onChange={(e)=>setUser(e.target.value)} type="text" placeholder='type here to search' />
            <button onClick={handleSearch}>Search</button>
        </section>
        
        {
         users&&users.length<1?<h2>{message}</h2>:
         users&&users.map((item,index)=>(
            <User 
           
            handleClick={handleClick}
            user_id={item._id}
             key = {index}
             Username={item.Username}
             Name={item.Name}
             profile={item.Profile}
            />
          ))
        }
    </main>
    </div>
    
      
    </>
  )
}

export default Search