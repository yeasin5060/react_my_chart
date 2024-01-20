import React from 'react'
import './Homefriend.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import Pera from '../../../../Utilys/Pera/Pera';

const Homefriend = () => {
  return (
    <section id='friend_list'>
        <div className='friend_list_wrapper_box'>
        <Groupusers grouphead="Friend">
                <div className='friend_list_profile_wrapper_box'>
                    {
                        [ 1 , 2 , 3 , 4 ,5 , 6 , 7 , 8 ].map((item , index)=>(
                            <div className='friend_list_profile_wrapper'>
                                <div className='friend_list_profile_box'>
                                    <div className='friend_list_profile_image'>
                                        <img src={profileone} alt="" />
                                    </div>
                            
                                    <div className='friend_list_profile_name'>
                                        <h4 className='friend_list_profile_friend_name'>Raghav</h4>
                                        <h5 className='friend_list_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='friend_list_profile_add_btn'>
                                    <Pera text="Today, 8:56pm"style="friend_time_jon"/>
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

export default Homefriend