import React, { useState } from 'react'
import './Homefriend.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import Pera from '../../../../Utilys/Pera/Pera';
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

const Homefriend = () => {
    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
    let [friendList , setFriendList] =useState([])
    let [unBlockFriendlist , setUnBlockFriendList] = useState([])

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

    useEffect(()=>{
        const unBlockListRef = ref(db, 'unblockusers');
            onValue(unBlockListRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid == item.val().whereofunblockid ){
                    array.push({...item.val(),id:item.key})
                }
            })
            setUnBlockFriendList(array)
        });
    },[])
    
    let handelblockusers = (blockinfo)=>{
        set(push(ref(db, 'blockedusers')), {
            whereofblockid : blockinfo.whosenderid,
            whereofblockname : blockinfo.whosendername,
            whereofblockemail :blockinfo.whosenderemail,
            whereofblockimg : blockinfo.whosenderimg,
            receiverid : alldata.uid,
            receivername :alldata.displayName,
            receiveremail : alldata.email,
            receiverimg :alldata.photoURL,

        }).then (()=>{
            remove(ref(db, 'userfriend/' + blockinfo.id))
        })
        alert("Block Succesful")
    }

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
                                        <img src={ alldata.uid == item. whosenderid ? item.whoreceivimg : item.whosenderimg } alt="not found" />
                                    </div>
                            
                                    <div className='friend_list_profile_name'>
                                        {
                                            alldata.uid == item.whosenderid
                                            ?
                                            <div>
                                                <h4 className='friend_list_profile_friend_name'>{item. whoreceivname}</h4>
                                                <Pera text="Today, 8:56pm"style="friend_time_jon"/>
                                            </div>   
                                            :
                                            <div>
                                                <h4 className='friend_list_profile_friend_name'>{item.whosendername}</h4>
                                                <Pera text="Today, 8:56pm"style="friend_time_jon"/>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='friend_list_profile_add_btn_box'>
                                    <button className='friend_list_profile_add_btn' onClick={()=>handelblockusers(item)}>Block</button>
                                </div>
                            </div>
                        ))
                        :
                        <div className='homefriendlist_oval_box'>
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
            </Groupusers>
        </div>
    </section>
  )
}

export default Homefriend