import React, { useContext, useState } from 'react'
import { addComments, updatePosts } from '../Api/Services';
import ContextProvider from '../Context/ContextProvider';
const btn1={
  marginLeft: '165px',
  paddingLeft: '18px',
  paddingRight: '17px',
  height: '23px',
  cursor:' pointer',
  border: 'none',
  background: '#3be4e4',
  borderRadius: '5px',
}

const AddComent = ({id}) => {
    const [comment,setComment] = useState(null);
    const{user}= useContext(ContextProvider);
    const updateComments = async()=>{
        if(comment){
            console.log(user)
          const  data={
                postId:id,
                Comment:comment,
                userName:user.Username,
                Profile:user.Profile
            }
           let res= await addComments(data);
           alert(res.message);
           
        }
    }
  return (
   <section style={{paddingTop:'3px',paddingBottom:'3px'}}>
    <input style={{border:'none',outline:'none'}} type="text" placeholder='add comment' onChange={(e)=>setComment(e.target.value)} />
    <button className='btn-2' onClick={updateComments} style={btn1} >add</button>
   </section>
  )
}

export default AddComent