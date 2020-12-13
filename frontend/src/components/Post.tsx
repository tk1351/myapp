import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Avatar } from '@material-ui/core'
import { useDispatch ,useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'
import { selectAllComments, Value, addNewComment } from '../features/commentSlice'
import { selectUser } from '../features/authSlice'
import { makeStyles } from '@material-ui/core/styles'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

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
  const comments = useSelector(selectAllComments)

  const dispatch = useDispatch()

  // categoryIdと名前を一致させる
  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find((category: { _id: string }) => category._id === categoryId)?.name
  }

  // FIXME: 自身が投稿した記事の場合は編集・削除ができる
  const updatePost = () => {

  }

  const deletePost = () => {
    
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
    </div>
  )
}

export default Post
