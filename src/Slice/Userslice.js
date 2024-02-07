import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value:localStorage.getItem("user")? localStorage.getItem("user"):null,
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