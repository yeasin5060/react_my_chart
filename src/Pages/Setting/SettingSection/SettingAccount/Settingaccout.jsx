import React from 'react'
import './Settingaccount.css'
import { FaKey } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { LiaThemeco } from "react-icons/lia";

const Settingaccout = () => {
  return (
    <div className='setting_account'>
        <div className='setting_account_head'>
            <h4 className='setting_account_heading'>Account Settings</h4>
        </div>
        <div className='setting_account_wrapper_box'>
            <div className='setting_account_wrapper'>
                <div className='setting_account_icon'>
                    <button className='setting_account_link_btn'><FaKey className='setting_account_key_icon'/></button>
                </div>
                <div className='setting_account_icon_name'>
                    <Link to = "changepassword">Change Password</Link>
                </div>
            </div>
            <div className='setting_account_wrapper'>
                <div className='setting_account_icon'>
                    <button className='setting_account_link_btn'><LiaThemeco className='setting_account_key_icon'/></button>
                </div>
                <div className='setting_account_icon_name'>
                    <Link to = "changepassword">Theme.</Link>
                </div>
            </div>
            <div className='setting_account_wrapper'>
                <div className='setting_account_icon'>
                    <button className='setting_account_link_btn'><MdDelete className='setting_account_key_icon'/></button>
                </div>
                <div className='setting_account_icon_name'>
                    <Link to = "changepassword">Delete Account.</Link>
                </div>
            </div>
        </div>
        <div className='setting_account_chat_btn'>
            <button className='setting_account_chat_button'>Chat App</button>
        </div>
    </div>
  )
}

export default Settingaccout