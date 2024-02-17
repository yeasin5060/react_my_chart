import React, { useState } from 'react'
import './Homeblockuser.css'
import profileone from '../../../../images/profileone.png';
import Groupusers from '../../../../Components/Groupusers/Groupusers'
import { getDatabase, ref, onValue , set , push ,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

const Homeblockuser = () => {
    const alldata = useSelector((state) => state.logindata.value)
    const db = getDatabase();
     let [blockList , setBlockList] = useState()

     useEffect(()=>{
        const blockListRef = ref(db, 'blockedusers');
            onValue(blockListRef, (snapshot) => {
               let array = []
            snapshot.forEach((item)=>{
                if(alldata.uid != item.val().whereofblockemail){
                    array.push({...item.val(),id:item.key})
                }
            })
            setBlockList(array)
        });
    },[])
    console.log(blockList)

  return (
    <section id='block_user'>
    <div className='block_user_wrapper_box'>
    <Groupusers grouphead="Blocked Users">
            <div className='block_user_profile_wrapper_box'>
                {
                    blockList && blockList.length > 0
                    ?
                    blockList.map((item , index)=>(
                        <div key={index} className='block_user_profile_wrapper'>
                            <div className='block_user_profile_box'>
                                <div className='block_user_profile_image'>
                                    <img src={item.whereofblockimg} alt="" />
                                </div>
                        
                                <div className='block_user_profile_name'>
                                    <h4 className='block_user_profile_friend_name'>{item. whereofblockname}</h4>
                                    <h5 className='block_user_profile_online'>56pm</h5>
                                </div>
                            </div>
                            <div className='block_user_profile_add_btn'>
                               <button className='block_user_accept'>unblock</button>
                            </div>
                        </div>
                    ))
                    :
                    <div className='homeblocklist_oval_box'>
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

export default Homeblockuser