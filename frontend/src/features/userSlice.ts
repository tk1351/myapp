import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchAvatars = createAsyncThunk(
  'users/fetchAvatars',
  async () => {
    const url = '/api/v1/user'
    const res = await axios.get(url)
    return res.data
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAvatars.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchAvatars.fulfilled as any]: (state, action) => {
      state.status = 'suceeded'
      state.users = state.users.concat(action.payload)
    },
    [fetchAvatars.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const selectAllUsers = (state: any) => state.userData.users

export default usersSlice.reducer