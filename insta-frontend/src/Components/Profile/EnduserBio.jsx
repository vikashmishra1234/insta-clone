import React from 'react'

const EnduserBio = ({image}) => {
    console.log(image)
  return (
    <div><img src={`src/userProfiles/${image}`} alt="imgl" /></div>
  )
}

export default EnduserBio