import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 //const url = 'http://localhost:2000';
const url = 'https://insta-clone-knbn.onrender.com';



export const signUp=async(data)=>{

    try {
        const fetch = await axios.post(`${url}/api/signup`,data);
       return fetch.data
    } catch (error) {
        alert(error.message)
       console.log(error.message) ;
    }
}
export const login=async(data)=>{
    try {
        const fetch = await axios.post(`${url}/api/login`,data);
        if(fetch.data.success){
            return fetch.data
        }
        else{

            alert(fetch.data.error);
        }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const ImgeUpload=async(data)=>{
    try {
        const fetch = await axios.post(`${url}/api/imgage/upload`,data);
        console.log(fetch)
       if(fetch.data.success){
        return fetch.data
       }
       else{
        alert("something went wrong while adding post");
       }
    } catch (error) {

       console.log(error.message) ;
       alert(error.message)
    }
}
export const GetUser=async(id)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/user/${id}`);
       if(fetch.data.success){
        return fetch.data
       }
      
    } catch (error) {
       console.log(error.message) ;
       
    }
}
export const updateProfile=async(data,id)=>{
    console.log(id,data)
    try {
        const fetch = await axios.put(`${url}/api/update/profile/${id}`,data);
       if(fetch.data.success){
        return fetch.data
       }
       else{
       console.log(fetch)
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const updatePost=async(id)=>{
    try {
        const fetch = await axios.put(`${url}/api/update/postno/${id}`);
       if(fetch.data.success){
        return fetch.data
       }
       else{
       console.log(fetch)
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const updatePosts=async(data,id)=>{
    
    try {
        const fetch = await axios.put(`${url}/api/update/post/${id}`,data);
       if(fetch.data.success){
        return fetch.data
       }
       else{
        alert("something went wrong ")
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const addComments=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/post/reaction`,data);
       if(fetch.data.success){
        return fetch.data
       }
       else{
        alert(fetch.data.error)
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const getAllCommet=async(id)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/get/comment/${id}`);
       if(fetch.data.success){
        return fetch.data
       }
       else{
        alert("something went wrong ")
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const getProfile=async(id)=>{
    try {
        const fetch = await axios.get(`${url}/api/get/profile/${id}`);
       if(fetch.data.success){
        return fetch.data
       }
       else{
        alert(fetch.data.error)
       }
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}





export const createProfile=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/create/profile`,data);
       if(fetch.data.success){
        return fetch.data
       }
      
    } catch (error) {
       console.log(error.message) ;
       
    }
}
export const getAllPost=async(id)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/get/allpost/${id}`);
       if(fetch.data.success){
        return fetch.data
       }
      
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const searchUser=async(user)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/get/user/?user=${user}`);
       if(fetch.data.success){
        return fetch.data
       }
      
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}
export const uploadProfile=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/profile/upload`,data);
       if(fetch.data.success){
        return fetch.data
       }
      
    } catch (error) {
       console.log(error.message) ;
       alert(error.message)
    }
}

export const getRecent=async(id)=>{
   
    try {
        const fetch = await axios.get(`${url}/api/get/post/${id}`);
        if(fetch.data.success){
            return fetch.data;
        }
        else if(!fetch.data.success){
            console.log(fetch.data.error)
        }
        if(fetch.data.verify===false){
          
            return fetch;
        }
    } catch (error) {
        console.log(error.message);
    }
}
export const adminGet=async(id)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/get/admin/${id}`);
        if(fetch.data.success){
            return fetch.data;
        }
        else{
            alert(fetch.data.error);
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
}
export const removeFollow=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/remove/follower`,data);
        if(fetch.data.success){
            return fetch.data;
        }
        else{
            alert(fetch.data.error);
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
}
export const addFollower=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/add/follower`,data);
        if(fetch.data.success){
            return fetch.data;
        }
        else{
            alert(fetch.data.error);
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
}
export const getposts=async(id)=>{
    
    try {
        const fetch = await axios.get(`${url}/api/get/allposts/${id}`);
        if(fetch.data.success){
            return fetch.data;
        }
       
    } catch (error) {
        console.log(error.message);
        
    }
}
export const followCheck=async(data)=>{
    
    try {
        const fetch = await axios.post(`${url}/api/follower/check`,data);
        if(fetch.data.success){
            return fetch.data;
        }
        else{
            alert(fetch.data.error);
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
}






