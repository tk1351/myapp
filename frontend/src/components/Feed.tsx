import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Feed: React.FC = () => {
  const user = useSelector(selectUser)

  console.log('avatar', user.photoUrl)

  const loginUserState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('nakami', user)
        const addUserInfo = async () => {
          const url = '/api/v1/user'
          try {
            await axios.post(url, {
              uid: user.uid,
              username: user.displayName,
              photoUrl: user.photoURL
            })
          } catch (err) {
            console.error(err)
          }
        }
        addUserInfo()
      } else {
        console.log('未ログイン')
      }
    })
  }

  useEffect(() => {
    loginUserState()
  }, [user])

  return (
    <div>
      Feed
      <button
        onClick={async () => {
          await auth.signOut()
        }}
      >
        logout
      </button>
    </div>
  )
}

export default Feed
