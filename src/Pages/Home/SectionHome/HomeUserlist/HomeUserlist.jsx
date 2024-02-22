import React, { useEffect, useState } from 'react'
import './HomeUserlist.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import Groupusers from '../../../../Components/Groupusers/Groupusers';
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Oval } from 'react-loader-spinner';

const HomeUserlist = () => {

    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
    let [userList , setUserList] = useState([])
    let [ request , setRequest] = useState([])
    
    useEffect(()=>{
        const userListRef = ref(db, 'usersdata');
            onValue(userListRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid != item.key){
                    array.push({...item.val(),id:item.key})
                }
            })
            setUserList(array)
        });
    },[])
    console.log(userList)
    let sendrequest = (sendrequestinfo)=>{
        set(push(ref(db, 'friendrequest')), {
            senderid : alldata.uid,
            sendername : alldata.displayName,
            senderimg : alldata.photoURL,
            senderemail : alldata.email,
            receiverid : sendrequestinfo.id,
            receivername : sendrequestinfo.username,
            receiverimg : sendrequestinfo.profileImage,
            receiveremail : sendrequestinfo.email,
        });
        alert("Friend Request Succesful")
        setRequesttogol(true)
        console.log(sendrequestinfo)
    }
    let cancelrequest = (cancel)=>{
        
    }

    useEffect(()=>{
        const requestRef = ref(db, 'friendrequest');
            onValue(requestRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid == item.val().senderid){
                    array.push(item.val() + item.val().receiverid)
                }
            })
            setRequest(array)
        });
    },[])
    console.log(request)
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
                                    {
                                        request.includes(item.id + alldata.uid) || request.includes(alldata.uid + item.id)
                                        ?
                                        <button onClick={() => cancelrequest (item)}          className='user_list_profile_btn'>
                                            cancle
                                        </button>
                                        :
                                        <button onClick={() => sendrequest (item)}        className='user_list_profile_btn'>
                                         add
                                        </button>
                                    }   
                                </div>
                            </div>
                        ))
                        :
                        <div className='homefrienduserlist_oval_box'>
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

export default HomeUserlist