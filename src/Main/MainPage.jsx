import React, { useEffect } from 'react'
import './MainPage.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { NavLink, Outlet } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { loginuserdata } from '../Slice/Userslice';
import { useSelector, useDispatch } from 'react-redux'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const MainPage = () => {

    const alldata = useSelector((state) => state.logindata.value)
    const auth = getAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let handlelogout = ()=>{
        signOut(auth).then(()=>{
            localStorage.removeItem("user")
            dispatch(loginuserdata(null))
            navigate("/login")
        })
    }
    useEffect(()=>{
        if(!alldata){
            navigate("/login")
        }
    },[])
    useEffect(()=>{
        if(alldata){
          navigate("/home")
      }
    },[]);
    console.log(alldata)
  return (
    <>
       <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <div className='main_page'>
                    <div className='main_page_profile_box'>
                        <div className ='main_profile_box'>
                            <img className = "profile_iamge" src={alldata && alldata.photoURL} alt="not found"/>
                        </div>
                        <div className='main_page_profile_name_box'>
                            <h4 className='main_page_profile_name'>{alldata && alldata.displayName}</h4>
                        </div>
                    </div>
                    <div className='all_items'>
                        <ul className='main_page_link_item'>
                            <li>
                                <NavLink className="page_link" to = "home"><GoHome /></NavLink>
                            </li>
                            <li>
                                <NavLink className="page_link" to = "message"><AiTwotoneMessage /></NavLink>
                            </li>
                            <li>
                                <NavLink className="page_link" to = "notification"><IoMdNotificationsOutline /></NavLink>
                            </li>
                            <li>
                                <NavLink className="page_link" to = "setting"><IoSettingsOutline /></NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='main_page_btn'>
                        <button className='main_page_button' onClick={handlelogout}><NavLink className="page_link" to = "mainpagebtn"><MdOutlineLogout /></NavLink></button>
                    </div>
                </div>
            </Grid>
        <Grid item xs={9}>
           <div className='pages_box'>
                <Outlet/>
           </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default MainPage