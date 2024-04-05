import React from 'react'

const Allimages = ({image}) => {
  return (
    <section>
        <img height={'250px'} width={'200px'} src={`https://insta-clone-knbn.onrender.com/images/${image}`} alt="" />
    </section>
  )
}

export default Allimages;