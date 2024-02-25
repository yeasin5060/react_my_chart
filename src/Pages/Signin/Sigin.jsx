import React, { useState } from 'react'
import './Signin.css'
import TextField from '@mui/material/TextField';
import Subheading from '../../Utilys/Subheading/Subheading';
import signin from '../../images/signin.png'
import { Link } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { Oval } from 'react-loader-spinner';
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification ,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";


const Sigin = () => {

  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  let [ sigindata , setSigindata] = useState({
    email: "",
    fullname:"",
    password: ""
  });
  let handleSigin = (e)=>{
    let {name , value} = e.target
    setSigindata({...sigindata,[name]:value})
  };
  let signbtn = ()=>{
    setSiginvalidationerros(validaiton(sigindata))
    setReactLoder(true)
    createUserWithEmailAndPassword(auth, sigindata.email, sigindata.password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: sigindata.fullname, 
          photoURL: "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
        }).then(() => {
          set(ref(db, 'usersdata/' + userCredential.user.uid), {
            username: userCredential.user.displayName,
            email:userCredential.user.email,
            profileImage :userCredential.user.photoURL
          }).then(()=>{
            navigate("/login")
          });
        });
      });

  }).catch((error) => {
    const errorCode = error.code;
    if(errorCode == "auth/email-already-in-use"){
      siginvalidationerros.email = " Email already exised";
      setReactLoder(false)
    }
    else{
      siginvalidationerros.email = "";
    }
  });
   setSigindata({
    email: "",
    fullname: "",
    password: ""
   });
};

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
  let [ reactLoder , setReactLoder] = useState (false)

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
                  <TextField id="outlined-basic" value={setSigindata.email} type='text' label=" Email Address" name ="email" onChange={handleSigin} variant="outlined"/>
                  {siginvalidationerros.email && <p className='sigin_err'>{siginvalidationerros.email}</p>}
                </div>
                <div className='inputbox'>
                  <TextField id="outlined-basic"  value={setSigindata.fullname} type='email' label="Ful name " name ="fullname" onChange={handleSigin} variant="outlined" />
                  {siginvalidationerros.fullname && <p className='sigin_err'>{siginvalidationerros.fullname}</p>}
                </div>
                <div className='inputbox_password'>
                  <TextField id="outlined-basic"  value={setSigindata.password} type={checktype ? "password" : "text"} label=" Password" name ="password" onChange={handleSigin} variant="outlined" />
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
                  {
                    reactLoder 
                    ?
                    (<Oval
                      visible={true}
                      height="30"
                      width="30"
                      color="#fff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass="oval"
                      />)
                      :
                      <button className='btn' onClick={signbtn}>Sign up</button>
                  }
              </div>
              <div className='signin_page_signup'>
                <span className='signin_page_span'>Already  have an account ?<Link className='signin_page_em' to = "login">Sign In</Link></span>
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