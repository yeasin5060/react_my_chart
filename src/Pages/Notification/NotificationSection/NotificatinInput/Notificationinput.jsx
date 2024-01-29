import React from 'react'
import './Notificationinput.css'
import { LiaSearchSolid } from 'react-icons/lia';
import { BsThreeDotsVertical } from "react-icons/bs";


const Notificationinput = () => {
  return (
    <div className='notification_input_box'>
        <input className='notification_input' type='search' placeholder='Search'/>
        <LiaSearchSolid className='notification_search' />
        <button className='notification_input_btn'>
          <BsThreeDotsVertical className='notifivation_input_three_dot' />
        </button>
    </div>
  )
}

export default Notificationinput