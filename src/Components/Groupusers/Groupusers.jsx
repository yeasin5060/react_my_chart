import React from 'react'
import './Groupusers.css'
import { BsThreeDotsVertical } from "react-icons/bs";

const Groupusers = ({children , grouphead}) => {
  return (
   <section id='groups_users'>
        <div className='groups_users_wrapper'>
            <div className='groups_users_head'>
                <h3 className='groups_users_heading'>{grouphead}</h3>
            </div>
            <div className='groups_users_three_dot_box'>
                <button className='groups_users_three_dot_btn'>
                    <BsThreeDotsVertical className='groups_users_three_dot' />
                </button>
            </div>
        </div>
        {children}
   </section>
  )
}

export default Groupusers