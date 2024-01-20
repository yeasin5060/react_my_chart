import React from 'react'
import './HomeUserlist.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import Groupusers from '../../../../Components/Groupusers/Groupusers';
import profileone from '../../../../images/profileone.png';

const HomeUserlist = () => {
  return (
    <section id='user_list'>
        <div className='user_list_search_box_wrapper'>
            <div className='user_list_search_input_box'>
                <input className='user_list_search_input' type='search' placeholder='Search'/>
                <button className='user_list_search_three_dot'>
                    <BsThreeDotsVertical className='user_list_three_dot' />
                </button>
                <div className='user_list_search_icon_box'>
                    <LiaSearchSolid className='user_list_search' />
                </div>
            </div>
        </div>
        <div className='user_list_user_box'>
            <Groupusers grouphead="User List">
                <div className='user_list_profile_wrapper_box'>
                    {
                        [ 1 , 2 , ].map((item , index)=>(
                            <div className='user_list_profile_wrapper'>
                                <div className='user_list_profile_box'>
                                    <div className='user_list_profile_image'>
                                        <img src={profileone} alt="" />
                                    </div>
                            
                                    <div className='user_list_profile_name'>
                                        <h4 className='user_list_profile_user_name'>Raghav</h4>
                                        <h5 className='user_list_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='user_list_profile_add_btn'>
                                    <button className='user_list_profile_btn'>
                                        <FaPlus className='user_list_profile_add' />
                                    </button>
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

export default HomeUserlist