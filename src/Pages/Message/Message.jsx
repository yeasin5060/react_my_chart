import React, { useState } from 'react'
import './Message.css'
import Subheading from '../../Utilys/Subheading/Subheading'
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Pera from '../../Utilys/Pera/Pera';
import { Oval } from 'react-loader-spinner';
import { IoSend } from "react-icons/io5";

const Message = () => {
  const alldata = useSelector((state) => state.logindata.value)
  const db = getDatabase();
  let [friendList , setFriendList] =useState([])
  useEffect(()=>{
    const requestRef = ref(db, 'userfriend');
        onValue(requestRef, (snapshot) => {
           let array = []
        snapshot.forEach((item)=>{
            if(alldata.uid == item.val().whoreceivid || alldata.uid == item.val().whosenderid){
                array.push({...item.val(),id:item.key})
            }
        })
        setFriendList(array)
    });
},[])
  return (
    <section id='message_box'>
      <div className='message_box_wrapper'>
        <div className='message_friend_list_box'>
            <div className='message_friend_list_head_box'>
              <Subheading text="Friend List" style="message_friend_list_head"/>
            </div>
            <div className='message_friend_list_users_box'>
              {
                friendList && friendList.length > 0
                  ?
                    friendList.map((item , index)=>(
                        <div key={index} className='message_friend_list_profile_wrapper'>
                          <div className='message_friend_list_profile_box'>
                            <div className='message_friend_list_profile_image'>
                              <img src={ alldata.uid == item. whosenderid ? item.whoreceivimg : item.whosenderimg } alt="not found" />
                            </div>
                            
                            <div className='message_friend_list_profile_name'>
                              {
                                alldata.uid == item. whosenderid
                                  ?
                                    <div>
                                      <h4 className='message_friend_list_profile_friend_name'>{item. whoreceivname}</h4>
                                        <Pera text="Today, 8:56pm"style="message_friend_time_jon"/>
                                    </div>   
                                  :
                                    <div>
                                      <h4 className='message_friend_list_profile_friend_name'>{item.whosendername}</h4>
                                      <Pera text="Today, 8:56pm"style="message_friend_time_jon"/>
                                    </div>
                              }
                            </div>
                          </div>
                        </div>
                        ))
                        :
                        <div className='message_homefriendlist_oval_box'>
                            <Oval
                                visible={true}
                                height="60"
                                width="60"
                                color="#fff"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass="oval"
                            />
                        </div>
                    }
            </div>
        </div>
        <div className='messageing_box'>
            <div className='messageing_heading_box'>
              <Subheading text="yeasin" style="messageing_heading"/>
              <Pera text="Active now" style="messageing_active"/>
            </div>
            <div className='messageing_flex' >
                <div className='sender_message_box'>
                    <Pera text="hi" style="sender_message"/>
                </div>
                <div className='receiver_message_box'>
                  <Pera text="hello" style="receiever_message"/>
                </div>
                <div className='sender_message_box'>
                    <Pera text="hi" style="sender_message"/>
                </div>
                <div className='receiver_message_box'>
                  <Pera text="hello" style="receiever_message"/>
                </div>
            </div>
            <div className='messageing_input_box'>
              <input className='message_input' type="text" placeholder='inter youe message' />
              <div className='message_send_btn_box'>
                <button className='message_send_btn'><IoSend /></button>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Message