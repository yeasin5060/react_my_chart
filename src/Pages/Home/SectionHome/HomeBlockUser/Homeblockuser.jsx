import React from 'react'
import './Homeblockuser.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'

const Homeblockuser = () => {
  return (
    <section id='block_user'>
    <div className='block_user_wrapper_box'>
    <Groupusers grouphead="Blocked Users">
            <div className='block_user_profile_wrapper_box'>
                {
                    [ 1 , 2 , 3 , 4 ,5 , 6 , 7 , 8 ].map((item , index)=>(
                        <div className='block_user_profile_wrapper'>
                            <div className='block_user_profile_box'>
                                <div className='block_user_profile_image'>
                                    <img src={profileone} alt="" />
                                </div>
                        
                                <div className='block_user_profile_name'>
                                    <h4 className='block_user_profile_friend_name'>Raghav</h4>
                                    <h5 className='block_user_profile_online'>56pm</h5>
                                </div>
                            </div>
                            <div className='block_user_profile_add_btn'>
                               <button className='block_user_accept'>unblock</button>
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

export default Homeblockuser