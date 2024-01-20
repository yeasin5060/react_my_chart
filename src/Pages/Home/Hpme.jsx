import React from 'react'
import './Home.css'
import HomeUserlist from './SectionHome/HomeUserlist/HomeUserlist'
import Homegrouplist from './SectionHome/HomeGrouplist/Homegrouplist'
import Homefriend from './SectionHome/HomeFriend/Homefriend'
import Homefriendrequest from './SectionHome/HomeFriendrequest/Homefriendrequest'
import Homemygroup from './SectionHome/HomeMyGroup/Homemygroup'
import Homeblockuser from './SectionHome/HomeBlockUser/Homeblockuser'

const Hpme = () => {
  return (
   <section id='home_page'>
      <div className='container'>
        <div className='home_page_wrapper'>
          <HomeUserlist/>
          <Homefriend/>
          <Homegrouplist/>
          <Homefriendrequest/>
          <Homemygroup/>
          <Homeblockuser/>
        </div>
      </div>
   </section>
  )
}

export default Hpme