import React from 'react'
import '../../Style/feed.css'

const User = (props) => {
  return (
    <section className='search'>
        <div className='user-search' onClick={()=>props.handleClick(props.user_id)}>
            <img src={`https://insta-clone-knbn.onrender.com/profiles/${props.profile}`} alt="profile" height={'69px'} width={'71px'} />
            <span>{props.Username}
            <div><small>{props.Name}</small></div>
            </span>
        </div>
    </section>
  )
}

export default User;