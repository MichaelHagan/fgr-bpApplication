import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading:false,
  value: 0,
  user:[],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment:(state)=>{
        state.isLoading = !state.isLoading
    },
    addUser:(state,{payload})=>{
       state.user.push(payload)
    },
  },
})

export const { increment,addUser} = counterSlice.actions

export default counterSlice.reducer