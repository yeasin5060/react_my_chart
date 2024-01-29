import React from 'react'
import './Settingprofile.css'
import profile from '../../../../images/profile.png'
import Subheading from '../../../../Utilys/Subheading/Subheading';
import { MdModeEdit } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { MdMonochromePhotos } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { Link } from 'react-router-dom';


const Settingprofile = () => {
  return (
    <div className='setting_profile_box'>
        <div className='setting_profile_head'>
            <h4 className='setting_profile_heading'>Profile Settings</h4>
        </div>
        <div className='setting_profile_box_wrapper'>
            <div className='setting_profile_image'>
                <img src={profile} alt="not found" />
            </div>
            <div className='setting_profile_name_box'>
                <Subheading text="A B M Shawon Islam" style="setting_profile_name"/>
                <h4 className='setting_profile_alert'>Stay home stay safe</h4>
            </div>
        </div>
        <div className='setting_profile_link_wrapper'>
            <div className='setting_profile_link_wrapper_box'>
                <div className='setting_profile_link_box'>
                    <button className='setting_profile_link_btn'>
                        <MdModeEdit className='edit_pen' />
                    </button>
                </div>
                <div className='setting_profile_link_name'>
                    <Link to ="editprofile">Edit Profile Name</Link>
                </div>
            </div>
            <div className='setting_profile_link_wrapper_box'>
                <div className='setting_profile_link_box'>
                    <button className='setting_profile_link_btn'>
                        <AiTwotoneMessage className='edit_pen' />
                    </button>
                </div>
                <div className='setting_profile_link_name'>
                    <Link to ="editprofile">Edit Profile Status Info.</Link>
                </div>
            </div>
            <div className='setting_profile_link_wrapper_box'>
                <div className='setting_profile_link_box'>
                    <button className='setting_profile_link_btn'>
                        <MdMonochromePhotos className='edit_pen' />
                    </button>
                </div>
                <div className='setting_profile_link_name'>
                    <Link to ="editprofile">Edit Profile Photo.</Link>
                </div>
            </div>
            <div className='setting_profile_link_wrapper_box'>
                <div className='setting_profile_link_box'>
                    <button className='setting_profile_link_btn'>
                        <GoQuestion className='edit_pen' />
                    </button>
                </div>
                <div className='setting_profile_link_name'>
                    <Link to ="editprofile">Help.</Link>
                </div>
            </div>
        </div>
        <div className='setting_profile_chat_btn'>
            <button className='setting_profile_chat_button'>Chat App</button>
        </div>
    </div>
  )
}

export default Settingprofile