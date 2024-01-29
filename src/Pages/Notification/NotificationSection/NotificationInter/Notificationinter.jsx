import React from 'react'
import './Notificationinter.css'
import { IoIosNotifications } from "react-icons/io";
import Pera from '../../../../Utilys/Pera/Pera';

const Notificationinter = () => {
  return (
    <div id='notification_inter'>
        <div className='notification_inter_wrapper'>
            {
                [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10].map((item , index)=>(
                    <div key={index} className='notification_inter_wrapper_box'>
                        <div className='notification_inter_icon'>
                            <IoIosNotifications  className='notification_icon'/>
                        </div>
                        <div className='notification_inter_message'>
                            <Pera text="Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi." style="notification_message"/>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Notificationinter