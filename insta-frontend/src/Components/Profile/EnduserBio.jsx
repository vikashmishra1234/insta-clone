import React from 'react'

const EnduserBio = ({image}) => {
    console.log(image)
  return (
    <div><img src={`https://insta-clone-knbn.onrender.com/userProfiles/${image}`} alt="imgl" /></div>
  )
}

export default EnduserBio