import React, { useState } from 'react'
import './Homefriend.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import Pera from '../../../../Utilys/Pera/Pera';
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

const Homefriend = () => {
    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
    let [friendList , setFriendList] =useState()

    useEffect(()=>{
        const requestRef = ref(db, 'userfriend');
            onValue(requestRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid == item.val().whoreceivid || alldata.uid == item.val(). whosenderid){
                    array.push({...item.val(),id:item.key})
                }
            })
            setFriendList(array)
        });
    },[])
    console.log(friendList)
  return (
    <section id='friend_list'>
        <div className='friend_list_wrapper_box'>
        <Groupusers grouphead="Friend">
                <div className='friend_list_profile_wrapper_box'>
                    {
                        friendList && friendList.length > 0
                        ?
                        friendList.map((item , index)=>(
                            <div key={index} className='friend_list_profile_wrapper'>
                                <div className='friend_list_profile_box'>
                                    <div className='friend_list_profile_image'>
                                        <img src={ alldata.uid == item. whosenderid ? item.whoreceivimg : item.whosenderimg } alt="" />
                                    </div>
                            
                                    <div className='friend_list_profile_name'>
                                        {
                                            alldata.uid == item. whosenderid
                                            ?
                                            <h4 className='friend_list_profile_friend_name'>{item. whoreceivname}</h4>
                                            :
                                            <h4 className='friend_list_profile_friend_name'>{item.whosendername}</h4>
                                        }
                                    </div>
                                </div>
                                <div className='friend_list_profile_add_btn'>
                                    <Pera text="Today, 8:56pm"style="friend_time_jon"/>
                                </div>
                            </div>
                        ))
                        :
                        <h1>loding</h1>
                    }
                </div>
            </Groupusers>
        </div>
    </section>
  )
}

export default Homefriend