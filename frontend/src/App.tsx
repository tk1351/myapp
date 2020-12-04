import React, { useEffect } from 'react'
import Auth from './components/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth } from './firebase'
import Feed from './components/Feed'


const App: React.FC = () => {
  const user = useSelector(selectUser)
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
        {user.uid ? (
          <div>
            <Feed />
          </div>
        ) : (
          <Auth />
        )}
    </>
  )
}

export default App
