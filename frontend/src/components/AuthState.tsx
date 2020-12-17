import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Redirect } from "react-router-dom"
import Spinner from "../components/Spinner"
import Container from "@material-ui/core/Container";

export type AuthenticationState =
  | { isLoading: true }
  | { isLoading: false; user: firebase.User | null }

const AuthState: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthenticationState>({ isLoading: true })

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      setAuth({ isLoading: false, user })
      unsub()
    })
  }, [])
  return (
    <Container component="main" maxWidth="xs">
      {auth.isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {(() => {
            return !auth.user ? <Redirect to={"/login"} /> : <>{children}</>;
          })()}
        </>
      )}
    </Container>
  )
}

export default AuthState
