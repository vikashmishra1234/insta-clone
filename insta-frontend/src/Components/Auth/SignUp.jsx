import React from "react";
import insta from "../../assets/instagram.png";
import "../../Style/auth.css";
import { HandleForm } from "./HandleForm";
import { signUp } from "../Api/Services";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
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
        
       let data= await HandleForm(signUp,formObject);
      if(data.success){
          
       localStorage.setItem("token",data.token);
       localStorage.setItem("userId",data.user._id)
       alert(data.message);
       Navigate('/home');
     
      }
      else{
        alert(data.error)
      }
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
          required
            autoComplete="off"
            placeholder="enter email"
            name="Email"
            type="email"
          />
          <input
          required
            autoComplete="off"
            placeholder="enter name"
            name="Name"
            type="text"
          />
          <input
          required
            autoComplete="off"
            placeholder="enter username"
            name="Username"
            type="user-name"
          />
          <input
          required
            autoComplete="off"
            placeholder="password"
            name="Password"
            type="password"
          />
          <input
          required
            autoComplete="off"
            placeholder="confirm password"
            name="ConfirmPass"
            type="password"
          />

          <section>
            <p>
              People who use our service may have uploaded your contact
              information to Instagram. Learn more
            </p>
          </section>
          <section>
            <p>
              By signing up, you agree to our Terms, Privacy Policy and Cookies
              Policy.
            </p>
          </section>
          <div>
            <button type="submit">Sign UP</button>
          </div>
          <div style={{margin:'5px'}}>
            <Link to='/login'>Already have an account?Login</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
