import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts } from '../features/postSlice'
import { selectAllCategories, fetchCategoriesData } from '../features/categorySlice'
import { selectAllUsers, fetchAvatars } from '../features/userSlice'
import { Avatar, TextField, Button } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import SendIcon from '@material-ui/icons/Send'
import { selectAllComments, addNewComment } from '../features/commentSlice'
import { Formik, Form } from 'formik'
import { selectUser } from '../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'

interface Comment {
  _id: string,
  uid: string,
  photoUrl: string,
  text: string,
  createdAt: any
}

const initialValues = {
  _id: '',
  uid: '',
  photoUrl: '',
  text: '',
  createdAt: null
}

const SinglePostPage: React.FC = ({ match }: any) => {
  const { id } = match.params

  const [openComments, setOpenComments] = useState(false)

  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const users = useSelector(selectAllUsers)
  const comments = useSelector(selectAllComments)
  const authUser = useSelector(selectUser)

  const dispatch = useDispatch()

  const singlePost = posts.find((post : { _id: string }) => post._id === id)

  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector((state: any) => state.categoriesData.status)

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
    if (userStatus === 'idle') {
      dispatch(fetchAvatars())
    }
  }, [categoriesStatus, userStatus, dispatch])

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find((category: { _id: string }) => category._id === categoryId)?.name
  }

  const fetchAuthorData = users.find((user: { uid: string }) => user.uid === singlePost.uid)

  const commentsOnThisPost = comments.filter((comment: { postId: string }) => comment.postId === singlePost._id)

  // コメントした人のuidから名前を特定する
  const matchUidAndUsername = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  const onSaveCommentClicked = async (values: Comment) => {
    try {
      const newValues = { 
        ...values, 
        photoUrl: authUser.photoUrl, 
        uid: authUser.uid, 
        postId: singlePost._id 
      }
      const resultAction = await dispatch(addNewComment(newValues))
      unwrapResult(resultAction as any)
    } catch (err) {
      console.error(err)
    }
  }

  // FIXME: 自身が投稿した記事の場合は編集・削除ができる
  const updatePost = () => {

  }

  const deletePost = () => {
    
  }
  
  return (
    <div>
      <Avatar src={fetchAuthorData.photoUrl}/>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.text}</p>
      {singlePost.image && (
        <Avatar src={singlePost.image}/>
      )}
      <p>カテゴリー： {matchCategoriesIdAndCategoriesName(singlePost.categoryId)}</p>
      <MessageIcon onClick={() => setOpenComments(!openComments)} />
      {openComments && (
        <>
          {commentsOnThisPost.map((com: Comment) => (
            <div key={com._id}>
              <Avatar src={com.photoUrl}/>
              <span>@{matchUidAndUsername(com.uid)}</span>
              <span>{com.text}</span>
            </div>
          ))}
          <Formik
            initialValues={initialValues}
            onSubmit={(values: Comment) => {
              onSaveCommentClicked(values)
            }}
          >
            {({ values, handleChange }) => (
              <>
                <Form>
                  <TextField 
                    variant="outlined"
                    id="outlined-basic"
                    label="コメント"
                    name="text"
                    type="text"
                    value={values.text}
                    onChange={handleChange}
                  />
                </Form>
                {/* buttonがきかない */}
                <Button type="submit" disabled={!values}>
                  <SendIcon />
                </Button>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  )
}

export default SinglePostPage
