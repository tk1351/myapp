import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Post from './Post'

const initialPostState = {
  _id: '',
  uid: '',
  categoryId: '',
  title: '',
  text: '',
  image: '',
  url: '',
  fav: 0,
  createdAt: null,
}

const Feed: React.FC = () => {
  const user = useSelector(selectUser)
  const [posts, setPosts] = useState([initialPostState])

  const loginUserState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const addUserInfo = async () => {
          const url = '/api/v1/user'
          try {
            await axios.post(url, {
              uid: user.uid,
              username: user.displayName,
              photoUrl: user.photoURL,
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
    fetchPostsData()
  }, [user])

  const fetchPostsData = async () => {
    const url = '/api/v1/post'
    await axios.get(url).then((res) => {
      setPosts(res.data)
    })
  }

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
      {posts[0]?._id && (
        <>
          {posts?.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              uid={post.uid}
              categoryId={post.categoryId}
              title={post.title}
              text={post.text}
              image={post.image}
              url={post.url}
              fav={post.fav}
              createdAt={post.createdAt}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Feed
