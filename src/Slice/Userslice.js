import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "alldata",
  initialState: {
    value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
    loginuserdata: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginuserdata } = userSlice.actions

export default userSlice.reducer