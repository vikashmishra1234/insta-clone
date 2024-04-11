import React from "react";
import insta from "../../assets/instagram.png";
import "../../Style/auth.css";
import { HandleForm } from "./HandleForm";
import { login } from "../Api/Services";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let form = e.target
        let formData = new FormData(form)
        let formObj = Object.fromEntries(formData.entries());
        let formObject={}
        for (const key in formObj) {
          if (Object.hasOwnProperty.call(formObj, key)) {
            formObject[key] = formObj[key].toLowerCase();
          }
        }
       let data= await HandleForm(login,formObject);
       
       localStorage.setItem("token",data.token);
       localStorage.setItem("userId",data.user._id)
       alert(data.message);
       Navigate('/home');
      
    }
  return (
    <div className="container">
      <header>
        {/* <img src={insta} alt="insta image" /> */}
        <p>Sign up to see photos and videos from your friends.</p>
      </header>
      <main>
        <form action="" className="frm" onSubmit={handleSubmit}>
         
          
          <input
            autoComplete="off"
            placeholder="enter username"
            name="Username"
            type="user-name"
          />
          <input
            autoComplete="off"
            placeholder="password"
            name="Password"
            type="password"
          />
          <div>
            <Link to={'/'}>forgot password ?</Link>
          </div>

          <section>
            <p>
              People who use our service may have uploaded your contact
              information... Learn more
            </p>
          </section>
          <section>
            <p>
              By signing up, you agree to our Terms, Privacy Policy and Cookies
              Policy.
            </p>
          </section>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
