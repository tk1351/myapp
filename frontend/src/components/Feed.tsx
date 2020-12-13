import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { selectUser } from '../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Post, { PostProps } from './Post'
import { Avatar } from '@material-ui/core'
import history from '../history'
import { fetchPostData, selectAllPosts } from '../features/postSlice'
import { fetchAvatars, selectAllUsers } from '../features/userSlice'
import { fetchCategoriesData } from '../features/categorySlice'
import { selectAllComments, fetchCommentsData } from '../features/commentSlice'

const Feed: React.FC = () => {
  const user = useSelector(selectUser)
  const posts = useSelector(selectAllPosts)
  const users = useSelector(selectAllUsers)
  const comments = useSelector(selectAllComments)
  const postStatus = useSelector((state: any) => state.postData.status)
  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector((state: any) => state.categoriesData.status)
  const commentsStatus = useSelector((state: any) => state.commentData.status)

  const dispatch = useDispatch()

  const orderedPosts = posts
    .slice()
    .sort((a: { createdAt: string }, b: { createdAt: string }) =>
      b.createdAt.localeCompare(a.createdAt)
    )
  
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
    fetchAvatars()
    if (postStatus === 'idle') {
      dispatch(fetchPostData())
    }
    if (userStatus === 'idle') {
      dispatch(fetchAvatars())
    }
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
    if (commentsStatus === 'idle') {
      dispatch(fetchCommentsData())
    }
  }, [user, postStatus, userStatus, categoriesStatus, commentsStatus, dispatch])

  // 投稿者のuidからphotoUrlを探す
  const matchUidAndPhotoUrl = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.photoUrl
  }
 
  return (
    <div>
      Feed
      <button
        onClick={async () => {
          await auth.signOut()
          await history.push('/login')
        }}
      >
        logout
      </button>
      {orderedPosts[0]?._id && (
        <>
          {orderedPosts?.map((post: PostProps) => (
            <>
              <Avatar src={matchUidAndPhotoUrl(post.uid)}/>
              <Post
                key={post._id}
                props={post}
              />
            </>
          ))}
        </>
      )}
    </div>
  )
}

export default Feed
