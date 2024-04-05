import React from 'react'

const Allimages = ({image}) => {
  return (
    <section>
        <img height={'250px'} width={'200px'} src={`src/images/${image}`} alt="" />
    </section>
  )
}

export default Allimages;