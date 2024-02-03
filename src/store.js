import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './Slice/Userslice'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
  },
})