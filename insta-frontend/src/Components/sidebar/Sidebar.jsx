import React, { useContext, useEffect, useState } from 'react'
import insta from '../../assets/instagram.png'
import '../../Style/auth.css'
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { MdVideoCall } from "react-icons/md";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import UploadPost from '../Feed/UploadPost';
import { FaVideo } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ContextProvider from '../Context/ContextProvider';
import { getAllFollower } from '../Api/Services';

//import UploadPost from '../Feed/UploadPost';

const Sidebar = (props) => {
  const [form,setForm]=useState(false);
  const {setFollowing} = useContext(ContextProvider)
  useEffect(()=>{
    const getFollowing = async()=>{
        const res = await getAllFollower(localStorage.getItem("userId"));
       
        setFollowing(res.Following)
    }
    getFollowing();
},[])
 
  return (
    <aside className='sidebar'>
        <div>
            <img src={insta} alt="image" />
        </div>
        <nav>
            <ul>
               <li><Link to={'/home'}><MdHome size={30}/><span className='lis'>Home</span></Link></li>
                <li> <Link to={'/search'}><FaSearch size={22}/><span className='lis'>Search</span></Link></li>
                <li> <Link to={'/following'}><FaVideo size={22}/><span className='lis'>Search</span></Link></li>

                {/* <li><MdExplore size={30}/> Explore</li> */}
                {/* <li><MdVideoCall size={30}/> Reels</li> */}
                {/* <li><BiSolidMessageRoundedDots size={30}/> Messages</li> */}
                {/* <li><CiHeart size={30}/> Notification</li> */}
                <li ><IoMdAddCircleOutline size={30} onClick={()=>setForm(!form)}/> <span className='lis'>Create</span></li>
                <li><Link id='profile' to={`/profile?user=${localStorage.getItem("profileId")}`}>Profile</Link></li>
            </ul>

        </nav>
        {
          form&&<UploadPost  setForm={setForm}/>
        }
      
        <div className='more'>
          <RxHamburgerMenu size={28}/>  More
        </div>
    </aside>
  )
}

export default Sidebar
