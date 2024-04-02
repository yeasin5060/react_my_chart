import React, { useEffect, useState } from 'react'
import './Login.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Subheading from '../../Utilys/Subheading/Subheading';
import TextField from '@mui/material/TextField';
import google from '../../images/google.svg'
import login from '../../images/login.png'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { Modal, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut , sendPasswordResetEmail ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginuserdata } from '../../Slice/Userslice';
import { Oval } from 'react-loader-spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Login = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  let [ formdata , setFormdata] = useState({
    email: "",
    password: ""
  })
  let handleform = (e)=>{
    let {name , value} = e.target
    setFormdata({...formdata,[name]:value})
  }
  let loginBtn = ()=>{
    setLoginvalidationerros(validaiton(formdata))
    setReactLoder(true)
      signInWithEmailAndPassword(auth, formdata.email, formdata.password)
        .then((userCredential) => {
          if(userCredential.user.emailVerified){
            localStorage.setItem("user",JSON.stringify(userCredential.user))
            dispatch(loginuserdata(userCredential.user))
            navigate("/home")
         }else{
            signOut(auth).then(() => {
              setLoginvalidationerros({email:"Verify your email"});
            });
         }
        }).catch((error) => {
          const errorCode = error.code;
            if(errorCode == "auth/invalid-credential"){
              setLoginvalidationerros({email:"Signin your email"});
              setReactLoder(false)
            }else{
              loginvalidationerros.email = " ";
            }
          });
  }
  let [loginvalidationerros , setLoginvalidationerros] = useState({})

  function validaiton (formdata){
    loginvalidationerros = {}

    let email_pattern = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    let password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    
    // ====================== email ==============

        if(formdata.email == ""){
          loginvalidationerros.email = "Email is Repuired!"
      }
      else{
          if(email_pattern.test(formdata.email)){
            loginvalidationerros.email = " ";
          }
          else{
            loginvalidationerros.email = "Inter validate Email";
          }
        }
    // ======================== password =================

    if(formdata.password == ""){
      loginvalidationerros.password = "Password is Repuired!";
    }
    else{
        if(password_pattern.test(formdata.password)){
            loginvalidationerros.password = " ";
        }
        else{
            loginvalidationerros.password = "Inter Strong Password";
        }
      }
      return loginvalidationerros;
  }
  let [checktype , setChecktype] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let forgetclose = ()=>{
    setOpen(false)
  }

  let [sendLink, setSendLink] = useState({
    forgetemail : "",
  })
  let [senLinkErr , setSendLinkErr] = useState({})
  let handleLink = (e)=>{
   let {name , value} = e.target;
   setSendLink({...sendLink,[name]:value})
  }
  let handlesend = ()=>{
     setSendLinkErr(linkValidation(sendLink))
      sendPasswordResetEmail(auth, sendLink.forgetemail)
      .then(() => {
        console.log("reset password secessfull");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  function linkValidation(sendLink){
    senLinkErr = {}
      let email_pattern = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
      // ====================== email ==============

      if(sendLink.forgetemail == ""){
        senLinkErr.forgetemail = "Email is Repuired!"
    }
    else{
        if(email_pattern.test(sendLink.forgetemail)){
          senLinkErr.forgetemail = "";
        }
        else{
          senLinkErr.forgetemail = "Inter validate Email";
        }
      }
      return (senLinkErr);
  }
  let [ reactLoder , setReactLoder] = useState (false)

      //gmail handle with google
  let handlegoogle = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      set(ref(db, 'usersdata/' + user.uid), {
        username: user.displayName,
        email: user.email,
        profileImage :user.photoURL
      }).then(()=>{
          navigate("/login")
        });
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <section id='login_page'>
      <Box sx = {{flexGrow : 1}}>
        <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className='login_page_form'>
              <div className='login_page_form_head'>
                <Subheading text="Login to your account!" style="login_page_head"/>
                <div onClick={handlegoogle} className='login_page_link_google_wrapper'>
                    <Link className='login_page_link_google'>
                      <img src={google} alt="not found" />
                      <span className='login_page_google'>Login with Google</span>
                    </Link>
                </div>
                <div className='login_page_input_box'>
                  <div className='login_input_box'>
                    <TextField id="outlined-basic" type='email' label=" Email Address" variant="standard" name = "email" onChange={handleform} />
                    {loginvalidationerros.email && <p className='login_err'>{loginvalidationerros.email}</p>}
                  </div>
                  <div className='login_input_box_password'>
                    <TextField id="outlined-basic" type={checktype ? "password" : "text"} label="Password" variant="standard"  name = "password" onChange={handleform}/>
                    {  
                      checktype  
                      ?
                      <IoEyeOffOutline className='login_closs_eye' onClick={()=>{setChecktype(!checktype)}}/>
                      :
                      <IoIosEye className='login_open_eye' onClick={()=>{setChecktype(!checktype)}} />
                    }
                    {loginvalidationerros.password && <p className='login_err'>{loginvalidationerros.password}</p>}
                  </div>
                </div>
                <div className='login_page_btn'>
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
                      <button onClick={loginBtn} className='login_btn'>Login to Continue</button>
                  }
                </div>
                <div className='login_page_signin'>
                  < span className='login_page_span'>Don’t have an account ?<Link className='login_page_em' to = "/">Sign Up</Link></span>
                </div>
                <div className='login_page_forget_pass'>
                  <p className='login_page_span'>
                    Your forget password!
                    <span className='login_page_em'  onClick={handleOpen}>Forget Password</span>
                  </p> 
                </div>
              </div>
          </div>
        </Grid>
          <Grid item xs={6}>
            <div className='login_page_image'>
              <img src={login} alt="not found" />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className='forget_close_icon' onClick={forgetclose}><IoClose /></button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Forget Password
          </Typography>
          <div className='login_page_forget_email'>
            <TextField id="outlined-basic" type='email' label=" Email Address" variant="standard"  name = "forgetemail" onChange={handleLink} />
            {senLinkErr.forgetemail && <p className='forget_err'>{senLinkErr.forgetemail}</p>}
            <button onClick={handlesend} className='forget_password_btn' >Send link</button>
          </div>
        </Box>
      </Modal>
    </section>
  )
}

export default Login