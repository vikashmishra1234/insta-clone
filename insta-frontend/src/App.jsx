import React, { useEffect, useState } from 'react'
import SignUp from './Components/Auth/SignUp';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Home from './Components/Home';
import ContextState from './Components/Context/ContexState';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/Profile/UpdateProfile';
import Search from './Components/searchUser/Search';
import EndUserProfile from './Components/Profile/EndUserProfile';
import { adminGet } from './Components/Api/Services';
import HomeVideo from './vedioCall/home'
import Room from './vedioCall/pages'
import Following from './Components/Profile/Following';


const App = () => {
 
  const [admin,setAdmin] = useState(null)
  useEffect(()=>{
      const getAdmin =async()=>{
      let res = await adminGet(localStorage.getItem("userId"));
     
      setAdmin(res.admin);
     
      }
      localStorage.getItem("userId")&&getAdmin();
  },[localStorage.getItem("userId")]);
  return (
    <div >

    <ContextState>

   <Router>
    <Routes>
    <Route exact path='/video' element={<HomeVideo/>}/>
    <Route exact path='/room/:roomId' element={<Room/>}/>

      <Route exact path='/' element={<SignUp/>}/>
      <Route exact path='/following' element={<Following/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/home' element={<Home />}/>
      <Route exact path='/profile' element={<Profile key={'uoperu989kjlf890'} admin={admin}/>}/>
      <Route exact path='/search' element={<Search/>}/>
      <Route exact path='/update/profile' element={<UpdateProfile/>}/>
      </Routes>
   </Router>
    </ContextState>
    </div>
  )
}

export default App
