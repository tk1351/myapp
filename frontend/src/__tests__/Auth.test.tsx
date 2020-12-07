import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Auth from '../components/Auth'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import userEvent from '@testing-library/user-event'

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
  it('Should disable button work in isLogin', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    userEvent.click(screen.getByTestId('authButton'))
    expect(screen.getByTestId('authButton')).toHaveAttribute('disabled')
  })
  it('Should disable button work in Register', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    const spanElement: any = screen.getByLabelText('changeScreen').querySelector('span')
    userEvent.click(spanElement)
    expect(spanElement).toHaveTextContent('Back to login')
    expect(screen.getByTestId('h1')).toHaveTextContent('Register')
    userEvent.click(screen.getByTestId('authButton'))
    expect(screen.getByTestId('authButton')).toHaveAttribute('disabled')
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


describe('Button conditionally triggered', () => {
  let store: any
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    })
  })
  it('Should not trigger signIn function', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    const mockFn = jest.fn()
    userEvent.click(screen.getByTestId('authButton'))
    expect(mockFn).not.toHaveBeenCalled()
  })
  it('Should not trigger signUp function', () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    const mockFn = jest.fn()
    const spanElement: any = screen.getByLabelText('changeScreen').querySelector('span')
    userEvent.click(spanElement)
    expect(spanElement).toHaveTextContent('Back to login')
    expect(screen.getByTestId('h1')).toHaveTextContent('Register')
    userEvent.click(screen.getByTestId('authButton'))
    expect(mockFn).not.toHaveBeenCalled()
  })
})

