import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/authSlice'
import { auth } from './firebase'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    // cleanup関数
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  )
}

export default App
