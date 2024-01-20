import React from 'react'
import './MainPage.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Img from '../Components/Img/Img';
import { NavLink, Outlet } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import profile from '../images/profile.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const MainPage = () => {
  return (
    <>
       <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <div className='main_page'>
                    <div className ='main_profile_box'>
                        <Img className = "profile_iamge" source={profile} alt="not found"/>
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
                        <button className='main_page_button'><NavLink className="page_link" to = "mainpagebtn"><MdOutlineLogout /></NavLink></button>
                    </div>
                </div>
            </Grid>
        <Grid item xs={9}>
            <Outlet/>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default MainPage