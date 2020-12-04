import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Auth from '../components/Auth'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import userEvent from '@testing-library/user-event'
import { TextField } from "@material-ui/core";


afterEach(() => {cleanup()})

describe('Rendering', () => {
  let store: any
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
  })
  it('Should render TextField isLogin', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    expect(screen.getByTestId('email')).toBeTruthy()
    expect(screen.getByTestId('password')).toBeTruthy()

  })
})

describe('Disable button conditionally triggered', () => {
  let store: any
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
  })
  it('Should disable button work', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    userEvent.click(screen.getByTestId('disabledButton'))
    expect(screen.getByTestId('disabledButton')).toHaveAttribute('disabled')
  })
})

describe('Input form onChange event', () => {
  let store: any
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
  })
  it('Should update input email value correctly', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    // Material-UIのaria-labelをgetoByLabelTextする
    const inputEmailValue: any = screen.getByLabelText('Email Address').querySelector('input')
    const inputPassValue: any = screen.getByLabelText('Password').querySelector('input')
    userEvent.type(inputEmailValue, 'test@example.com')
    userEvent.type(inputPassValue, 'testtest')
    expect(inputEmailValue?.value).toEqual('test@example.com')
    expect(inputPassValue?.value).toEqual('testtest')
  })
})
