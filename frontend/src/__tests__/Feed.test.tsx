import React from 'react'
import { cleanup, render, screen, act } from '@testing-library/react'
import Feed from '../components/Feed'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice';
import postsReducer from '../features/postSlice'
import usersReducer from '../features/userSlice'
import categoryReducer from '../features/categorySlice'
import commentReducer from '../features/commentSlice'
import firebase from 'firebase/app'
import { auth } from '../firebase'

jest.mock('../firebase')

afterEach(() => {cleanup()})

let store : any
beforeEach(() => {
  store = configureStore({
    reducer: {
      auth: authReducer,
      postData: postsReducer,
      userData: usersReducer,
      categoriesData: categoryReducer,
      commentData: commentReducer
    }
  })
})

describe('Rendering',  () => {
  it('Should rendered feed', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Feed />
        </Provider>
      )
    })
    // const email = 'test@example.com'
    // const password = 'testtest'

    // firebase.initializeApp = jest.fn()

    // await auth.signInWithEmailAndPassword(email, password)
    screen.debug()
  })
})