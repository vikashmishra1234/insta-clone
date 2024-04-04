import React, { useEffect, useState } from 'react'
import ContextProvider from './ContextProvider.jsx';


const ContextState = (props) => {
  const [recentPost,setRecent] = useState([]);
  const [user,setUser] =useState(null);
  const [admin,setAdmin] =useState(null);
  const [profile,setProfile] =useState(false);
  return (
    <ContextProvider.Provider value={{recentPost,user,profile,admin,setAdmin,setProfile,setUser,setRecent}} >
        {props.children}
    </ContextProvider.Provider>
  )
}

export default ContextState
