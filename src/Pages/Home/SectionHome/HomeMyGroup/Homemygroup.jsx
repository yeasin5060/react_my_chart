import React from 'react'
import './Homemygroup.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import Pera from '../../../../Utilys/Pera/Pera';

const Homemygroup = () => {
  return (
    <section id='my_group'>
        <div className='my_group_wrapper_box'>
        <Groupusers grouphead="My Group">
                <div className='my_group_profile_wrapper_box'>
                    {
                        [ 1 , 2 , 3 , 4 ,5 , 6 , 7 , 8 ].map((item , index)=>(
                            <div key={index} className='my_group_profile_wrapper'>
                                <div className='my_group_profile_box'>
                                    <div className='my_group_list_profile_image'>
                                        <img src={profileone} alt="" />
                                    </div>
                                    <div className='my_group_profile_name'>
                                        <h4 className='my_group_profile_friend_name'>Raghav</h4>
                                        <h5 className='my_group_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='my_group_profile_add_btn'>
                                    <Pera text="Today, 8:56pm"style="my_group_time_jon"/>
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

export default Homemygroup