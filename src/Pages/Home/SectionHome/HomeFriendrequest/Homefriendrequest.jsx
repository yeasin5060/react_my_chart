import React from 'react'
import './Homefriendrequest.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'

const Homefriendrequest = () => {
  return (
    <section id='friend_request'>
        <div className='friend_request_wrapper_box'>
        <Groupusers grouphead="Friend Request">
                <div className='friend_request_profile_wrapper_box'>
                    {
                        [ 1 , 2 , 3 , 4 ,5 , 6 , 7 , 8 ].map((item , index)=>(
                            <div className='friend_request_profile_wrapper'>
                                <div className='friend_request_profile_box'>
                                    <div className='friend_request_profile_image'>
                                        <img src={profileone} alt="" />
                                    </div>
                            
                                    <div className='friend_request_profile_name'>
                                        <h4 className='friend_request_profile_friend_name'>Raghav</h4>
                                        <h5 className='friend_request_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='friend_request_profile_add_btn'>
                                   <button className='friend_request_accept'>Accept</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Groupusers>
        </div>
    </section>
  )
}

export default Homefriendrequest