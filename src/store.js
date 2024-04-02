import { configureStore } from '@reduxjs/toolkit'
import Userslice from './Slice/Userslice'
import messageslice from './Slice/messageslice'
//import googleslice from './Slice/googleslice'
export default configureStore({
  reducer: {
    logindata:Userslice,
    activemessage : messageslice,
    //googledata : googleslice,
  },
})