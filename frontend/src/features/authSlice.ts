import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface User {
  displayName: string
  photoUrl: string
}

const initialState = {
  user: {
    uid: '',
    photoUrl: '',
    displayName: ''
  }
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = { uid: '', photoUrl: '', displayName: '' }
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user.displayName = action.payload.displayName
      state.user.photoUrl = action.payload.photoUrl
    }
  }
})

export const { login, logout, updateUserProfile } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer