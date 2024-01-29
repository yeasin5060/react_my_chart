import React from 'react'
import './Setting.css'
import Settinginput from './SettingSection/SettingInput/Settinginput'
import Settingprofile from './SettingSection/SettingProfile/Settingprofile'
import Settingaccout from './SettingSection/SettingAccount/Settingaccout'

const Setting = () => {
  return (
    <section id='setting_main_page'>
        <Settinginput/>
        <div className='setting_and_account_wrappwr'>
          <Settingprofile/>
          <Settingaccout/>
        </div>
    </section>
  )
}

export default Setting