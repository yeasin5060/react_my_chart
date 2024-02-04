import { configureStore } from '@reduxjs/toolkit'
import Userslice from './Slice/Userslice'
export default configureStore({
  reducer: {
    logindata:Userslice
  },
})