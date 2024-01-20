import React, { useState } from 'react'
import './Signin.css'
import TextField from '@mui/material/TextField';
import Subheading from '../../Utilys/Subheading/Subheading';
import signin from '../../images/signin.png'
import { Link } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";


const Sigin = () => {

  let [ sigindata , setSigindata] = useState({
    email: "",
    fullname:"",
    password: ""
  })
  let handleSigin = (e)=>{
    let {name , value} = e.target
    setSigindata({...sigindata,[name]:value})
  }
  let signbtn = ()=>{
    console.log(sigindata)
    setSiginvalidationerros(validaiton(sigindata))
}

      //========== validation ==================
  let [siginvalidationerros , setSiginvalidationerros] = useState({})

  function validaiton (sigindata){
    siginvalidationerros = {}

    let email_pattern = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    let password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    
    // ====================== email ==============

        if(sigindata.email == ""){
          siginvalidationerros.email = "Email is Repuired!"
      }
      else{
          if(email_pattern.test(sigindata.email)){
            siginvalidationerros.email = " ";
          }
          else{
            siginvalidationerros.email = "Inter validate Email";
          }
        }

    // ====================== fullname ==================

    if(sigindata.fullname == ""){
      siginvalidationerros.fullname = "Fullname is Required!";
    }
    else{
      siginvalidationerros.fullname = " ";
    }
    // ======================== password =================

    if(sigindata.password == ""){
      siginvalidationerros.password = "Password is Repuired!";
    }
    else{
        if(password_pattern.test(sigindata.password)){
            siginvalidationerros.password = " ";
        }
        else{
            siginvalidationerros.password = "Inter Strong Password";
        }
      }
      return siginvalidationerros;
  }

  let [checktype , setChecktype] = useState(false)

  return (
    <section id='signin_page'>
      <div className='container'>
        <div className='signin_page_wrapper'>
            <div className='signin_page_input_box'>
              <div className='signin_page_contant'>
                  <Subheading text="Get started with easily register" style="signin_page_heading"/>
                  <h4 className='signin_page_pera'>Free register and you can enjoy it</h4>
              </div>
              <div className='signin_page_input_group'>
                <div className='inputbox'>
                  <TextField id="outlined-basic" type='text' label=" Email Address" name ="email" onChange={handleSigin} variant="outlined"/>
                  {siginvalidationerros.email && <p className='sigin_err'>{siginvalidationerros.email}</p>}
                </div>
                <div className='inputbox'>
                  <TextField id="outlined-basic" type='email' label="Ful name " name ="fullname" onChange={handleSigin} variant="outlined" />
                  {siginvalidationerros.fullname && <p className='sigin_err'>{siginvalidationerros.fullname}</p>}
                </div>
                <div className='inputbox_password'>
                  <TextField id="outlined-basic" type={checktype ? "password" : "text"} label=" Password" name ="password" onChange={handleSigin} variant="outlined" />
                    {  
                      checktype  
                      ?
                      <IoEyeOffOutline className='closs_eye' onClick={()=>{setChecktype(!checktype)}}/>
                      :
                      <IoIosEye className='open_eye' onClick={()=>{setChecktype(!checktype)}} />
                    }
                  {siginvalidationerros.password && <p className='sigin_err'>{siginvalidationerros.password}</p>}
                </div>
              </div>
              <div className='signin_page_btn'>
                <button className='btn' onClick={signbtn}>Sign up</button>
              </div>
              <div className='signin_page_signup'>
                <span className='signin_page_span'>Already  have an account ?<Link className='signin_page_em' to = "login">Sign In</Link></span>
              </div>
              <div className='signin_page_signup_main_page'>
                <span className='signin_page_span'>Already  have an account go to the ?<Link className='signin_page_em' to = "mainpage">main page</Link></span>
              </div>
            </div>
            <div className='signin_page_input_image'>
                <img src={signin} alt="not found" />
            </div>
        </div>
      </div>
    </section>
  )
}

export default Sigin