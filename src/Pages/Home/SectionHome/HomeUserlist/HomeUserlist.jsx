import React, { useEffect, useState } from 'react'
import './HomeUserlist.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import Groupusers from '../../../../Components/Groupusers/Groupusers';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const HomeUserlist = () => {

    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
    let [userList , setUserList] = useState([])
    
    useEffect(()=>{
        const userListRef = ref(db, 'usersdata');
            onValue(userListRef, (snapshot) => {
            const data = snapshot.val();
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid != item.key){
                    array.push({...item.val(),id:item.key})
                }
            })
            setUserList(array)
        });

    },[])
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
                        userList && userList.length > 0
                        ?
                        userList.map((item , index)=>(
                            <div  key= {index} className='user_list_profile_wrapper'>
                                <div className='user_list_profile_box'>
                                    <div className='user_list_profile_image'>
                                        <img src={item.profileImage} alt="not found" />
                                    </div>
                            
                                    <div className='user_list_profile_name'>
                                        <h4 className='user_list_profile_user_name'>{item.username}</h4>
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
                        :
                        <h1>data nai</h1>
                    }
                </div>
            </Groupusers>
        </div>
    </section>
  )
}

export default HomeUserlist