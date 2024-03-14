import React, { useState } from 'react'
import './Homefriendrequest.css'
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

const Homefriendrequest = () => {
    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
    let [ request , setRequest] = useState([])

    useEffect(()=>{
        const requestRef = ref(db, 'friendrequest');
            onValue(requestRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid == item.val().receiverid){
                    array.push({...item.val(),id:item.key})
                }
            })
            setRequest(array)
        });
    },[])

    let  requestdelete = (deleteid)=>{
        remove(ref(db, 'friendrequest/' + deleteid.id))
       alert("Delete Done")
    }

    let requestconfirm = (acceptinfo)=>{
        set(push(ref(db, 'userfriend')), {
            whosenderid : acceptinfo.senderid,
            whosendername : acceptinfo.sendername,
            whosenderemail : acceptinfo.senderemail,
            whosenderimg : acceptinfo.senderimg,
            whoreceivid : alldata.uid,
            whoreceivname :alldata.displayName,
            whoreceivemail : alldata.email,
            whoreceivimg :alldata.photoURL,

        }).then (()=>{
            remove(ref(db, 'friendrequest/' + acceptinfo.id))
        })
        alert("Accept Succesful")
        console.log(acceptinfo)
    }

  return (
    <section id='friend_request'>
        <div className='friend_request_wrapper_box'>
        <Groupusers grouphead="Friend Request">
                <div className='friend_request_profile_wrapper_box'>
                    {
                        request && request.length > 0
                        ?
                        request.map((item , index)=>(
                            <div key={index} className='friend_request_profile_wrapper'>
                                <div className='friend_request_profile_box'>
                                    <div className='friend_request_profile_image'>
                                        <img src={item. senderimg} alt="" />
                                    </div>
                            
                                    <div className='friend_request_profile_name'>
                                        <h4 className='friend_request_profile_friend_name'>{item.sendername}</h4>
                                        <h5 className='friend_request_profile_online'>56pm</h5>
                                    </div>
                                </div>
                                <div className='friend_request_profile_add_btn'>
                                <button onClick={()=> requestdelete (item)} className='friend_request_accept'>Delete</button>
                                    <button onClick={()=> requestconfirm(item)} className='friend_request_accept'>Confirm</button>
                                </div>
                            </div>
                        ))
                        :
                        <div className='homefriendrequest_oval_box'>
                            <Oval
                                visible={true}
                                height="60px"
                                width="60px"
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

export default Homefriendrequest