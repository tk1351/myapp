import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Redirect } from "react-router-dom"
import { AuthenticationState } from '../AuthState'
import Spinner from '../Spinner'

const email = 'admin@example.com'

const AdminState: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthenticationState>({ isLoading: true })

  const unsub = firebase.auth().onAuthStateChanged((user) => {
    setAuth({ isLoading: false, user })
    console.log('aaa')
  })
  useEffect(() => {
    unsub()
  }, [])

  console.log(auth)

  return (
    <div>
      {auth.isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {(() => {
            return auth.user?.email === email ? <>{children}</> : <Redirect to={'/login'} />
          })}
        </>
      )}
    </div>
  )
}

export default AdminState
