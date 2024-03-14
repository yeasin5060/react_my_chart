import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: "messagedata",
  initialState: {
    value: null,
  },
  reducers: {
    activemessagedata: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { activemessagedata } =  messageSlice.actions

export default  messageSlice.reducer