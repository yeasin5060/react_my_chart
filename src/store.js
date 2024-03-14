import { configureStore } from '@reduxjs/toolkit'
import Userslice from './Slice/Userslice'
import messageslice from './Slice/messageslice'
export default configureStore({
  reducer: {
    logindata:Userslice,
    activemessage : messageslice,
  },
})