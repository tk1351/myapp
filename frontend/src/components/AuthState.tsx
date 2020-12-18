import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase'
import { Redirect, Router } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Container from '@material-ui/core/Container'
import history from '../history'

export type AuthenticationState =
  | { isLoading: true }
  | { isLoading: false; user: firebase.User | null }

const AuthState: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<AuthenticationState>({
    isLoading: true,
  })

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setIsLogin({ isLoading: false, user })
      unsub()
    })
  }, [])
  return (
    <Container component="main" maxWidth="xs">
      {isLogin.isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {(() => {
            return !isLogin.user ? (
              <Router history={history}>
                <Redirect to={'/'} />
              </Router>
            ) : (
              <>{children}</>
            )
          })()}
        </>
      )}
    </Container>
  )
}

export default AuthState
