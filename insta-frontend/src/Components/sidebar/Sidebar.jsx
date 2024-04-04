import React, { useEffect, useState } from 'react'
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

import { Link } from 'react-router-dom';

//import UploadPost from '../Feed/UploadPost';

const Sidebar = () => {
  const [form,setForm]=useState(false);
 
  return (
    <aside className='sidebar'>
        <div>
            <img src={insta} alt="image" />
        </div>
        <nav>
            <ul>
               <li><MdHome size={33}/><Link to={'/home'}>Home</Link></li>
                <li><FaSearch size={22}/> <Link to={'/search'}>Search</Link></li>
                {/* <li><MdExplore size={30}/> Explore</li> */}
                {/* <li><MdVideoCall size={30}/> Reels</li> */}
                {/* <li><BiSolidMessageRoundedDots size={30}/> Messages</li> */}
                {/* <li><CiHeart size={30}/> Notification</li> */}
                <li onClick={()=>setForm(!form)}><IoMdAddCircleOutline size={30}/> Create</li>
                <li><Link id='profile' to={`/profile?user=${localStorage.getItem("userId")}`}>Profile</Link></li>
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
