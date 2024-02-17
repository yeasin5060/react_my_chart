import React from 'react'
import './Homegrouplist.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'

const Homegrouplist = () => {
  return (
    <section id='group_list'>
        <div className='group_list_wrapper_box'>
        <Groupusers grouphead="Group List">
                <div className='group_list_profile_wrapper_box'>
                    {
                        [ 1 , 2 , 3 , 4 ,5 , 6 , 7 , 8 ].map((item , index)=>(
                            <div key={index} className='group_list_profile_wrapper'>
                                <div className='group_list_profile_box'>
                                    <div className='group_list_profile_image'>
                                        <img src={profileone} alt="" />
                                    </div>
                            
                                    <div className='group_list_profile_name'>
                                        <h4 className='group_list_profile_group_name'>Raghav</h4>
                                        <h5 className='group_list_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='group_list_profile_add_btn'>
                                    <button className='group_list_profile_btn'>Join</button>
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

export default Homegrouplist