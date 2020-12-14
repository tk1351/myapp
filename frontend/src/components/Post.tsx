import React from 'react'
import moment from 'moment'
import { Avatar } from '@material-ui/core'
import { useDispatch ,useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'
import { selectUser } from '../features/authSlice'
import { Link } from 'react-router-dom'
import { selectAllPosts, deletePost, PostedData } from '../features/postSlice'

interface PostData  {
  props: PostProps
}

export interface PostProps {
  _id: string
  uid: string
  categoryId: string
  title: string
  text: string
  image: string
  url: string
  fav: number
  createdAt: any
}

export const initialCategoriesState = [{
  name: '',
  _id: ''
}]

export const convertPostingDateToJapanTime = (createdAt: any) => {
  moment.locale('ja')
  return moment(createdAt).format('YYYY/MM/DD')
}

const Post: React.FC<PostData> = ({ props }) => {
  const user = useSelector(selectUser)
  const categories = useSelector(selectAllCategories)
  const posts = useSelector(selectAllPosts)

  const dispatch = useDispatch()

  // categoryIdと名前を一致させる
  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find((category: { _id: string }) => category._id === categoryId)?.name
  }

  const findOwnPostData = posts.find(
    (post : { uid: string }) => post.uid === user.uid
  )

  const onDeletePostClicked = (props: PostedData) => {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      dispatch(deletePost(props))
    }
  }

  return (
    <div>
      <p>{convertPostingDateToJapanTime(props.createdAt)}</p>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
      {props.image && (
        <Avatar src={props.image} />
      )}
      <p>カテゴリー: {matchCategoriesIdAndCategoriesName(props.categoryId)}</p>
      <Link to={`/post/detail/${props._id}`}>続きを読む</Link>
      {findOwnPostData?.uid === props.uid ? (
        <>
          <button>
            <Link to={`/post/edit/${props._id}`}>編集する</Link>
          </button>
          <button onClick={() => onDeletePostClicked(props)}>削除する</button>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Post
