import React, { useState ,useEffect , useRef } from 'react'
import './Message.css'
import Subheading from '../../Utilys/Subheading/Subheading'
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import Pera from '../../Utilys/Pera/Pera';
import { Oval } from 'react-loader-spinner';
import { IoSend } from "react-icons/io5";
import { activemessagedata } from '../../Slice/messageslice';
import { AiFillLike } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';

const Message = () => {
  const alldata = useSelector((state) => state.logindata.value)
  const messagedata = useSelector((state) => state.activemessage.value)
  const db = getDatabase();
  const [friendList , setFriendList] =useState([])
  let [masTaxt , setMasText] = useState("")
  const dispatch = useDispatch()
  const [messageList , setMessageList] = useState([])
  const [ emojiShow , setEmojiShow] = useState(false)
  const emojiref = useRef()
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

let handleuser = (i)=>{
  dispatch(activemessagedata(i))
}

let sendmessage = ()=>{
  set(push(ref(db , "messagedata")),{
          //sender data
    senderid : alldata.uid,
    sendername : alldata.displayName,
    senderimg : alldata.photoURL,
    senderemail : alldata.email,
    message : masTaxt,
          //receiver data
    receiverid : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderid : messagedata.whoreceivid,
    receivername : alldata.uid == messagedata.whoreceivid ? messagedata.whosendername: messagedata.whoreceivname,
    receiverimg : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderimg: messagedata.whoreceivimg,
    receiveremail : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderemail: messagedata.whoreceivemail,

  }).then = (()=>{
    setMasText("")
  })
}

useEffect(()=>{
  const requestRef = ref(db, 'messagedata');
      onValue(requestRef, (snapshot) => {
         let array = [];
         let activeuserid = messagedata.whosenderid == alldata.uid ? messagedata.whoreceivid : messagedata.whosenderid;
      snapshot.forEach((item)=>{
          if((item.val().senderid == alldata.uid && item.val().receiverid == activeuserid) || (item.val().receiverid == alldata.uid && item.val().senderid == activeuserid ) ){
              array.push({...item.val(),id:item.key});
          }
      })
      setMessageList(array)
  });
},[messagedata])

let handleMessage = (e)=>{
  setMasText(e.target.value)
}
let handleKeyUp = (e)=>{
  if(e.key == "Enter"){
    set(push(ref(db , "messagedata")),{
      //sender data
      senderid : alldata.uid,
      sendername : alldata.displayName,
      senderimg : alldata.photoURL,
      senderemail : alldata.email,
      message : masTaxt,
          //receiver data
      receiverid : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderid : messagedata.whoreceivid,
      receivername : alldata.uid == messagedata.whoreceivid ? messagedata.whosendername: messagedata.whoreceivname,
      receiverimg : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderimg: messagedata.whoreceivimg,
      receiveremail : alldata.uid == messagedata.whoreceivid ? messagedata.whosenderemail: messagedata.whoreceivemail,
  
    }).then = (()=>{
      setMasText("")
    })
  }
}
let handleEmojiPicker = (e)=>{
  setMasText(masTaxt + e.emoji);
}
useEffect (()=>{
  document.body.addEventListener("click",(e)=>{
    if(emojiref.current.contains(e.target)){
      setEmojiShow(true)
    }else{
      setEmojiShow(false)
    }
  })
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
                        <div onClick={()=> handleuser(item)} key={index} className='message_friend_list_profile_wrapper'>
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
          {
            messagedata != null
            ?
            <>
            <div className='messageing_heading_box'>
              <Subheading text={
                messagedata &&
                messagedata.whosenderid == alldata.uid
                ?
                messagedata.whoreceivname
                :
                messagedata.whosendername
              } style="messageing_heading"/>
              <Pera text="Active now" style="messageing_active"/>
            </div>
            <div className='messageing_flex' >
              {
                messageList.map((item , index)=>(
                  <div key={index} className={`${item.receiverid == alldata.uid ?"receiever_message_box" : "sender_message_box" }`}>
                    <p>{item.message}</p>
                  </div>
                ))
              }
            </div>
            <div className='messageing_input_box'>
              <input className='message_input' type="text" onKeyUp={handleKeyUp} placeholder='inter youe message' value={masTaxt} onChange={handleMessage} />
              {
                masTaxt.length > 0 &&
                <div className='message_send_btn_box'>
                  <button className='message_send_btn' onClick={sendmessage}><IoSend /></button>
                </div>
              }
              <div className='message_send_btn_box'>
                <button className='message_send_btn' ref={emojiref} onClick={()=> setEmojiShow(!emojiShow)}><AiFillLike /></button>
              </div>
              {
                emojiShow &&
                <div className='emoji_picker_box'>
                  <EmojiPicker onEmojiClick ={handleEmojiPicker} />
                </div>
              }
            </div>
            </>
            :
            <div className='message_undefind_box'>
              <Subheading text="Please Select a user" style="message_undefind"/>
            </div>
           }
        </div>
      </div>
    </section>
  )
}

export default Message