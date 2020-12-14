import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface PostData {
  title: string
  text: string
  categoryId: string
  url: string
  uid: string
  fav: number
}

export interface PostedData {
  _id: string
  uid: string
  title: string
  text: string
  categoryId: string
  url: string
  fav: number
  image: string
}

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPostData = createAsyncThunk(
  'posts/fetchPostData',
  async () => {
    const url = '/api/v1/post'
    const res = await axios.get(url)
    return res.data
  }
)

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (newValues: PostData) => {
    const url = '/api/v1/post'
    const res = await axios.post(url, newValues)
    return res.data
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (newValues: PostedData) => {
    const url = `/api/v1/post/${newValues._id}`
    const res = await axios.put(url, newValues)
    return res.data
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (props: PostedData) => {
    const url = `/api/v1/post/${props._id}`
    const res = await axios.delete(url)
    return res.data
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostData.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPostData.fulfilled as any]: (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPostData.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled as any]: (state: any, action) => {
      state.posts.push(action.payload)
    },
    [updatePost.fulfilled as any]: (state: any, action) => {
      const postData = state.posts.findIndex(
        (post: { _id: string }) => post._id === action.payload._id
      )
      state.posts.splice(postData, 1, action.payload)
    },
    [deletePost.fulfilled as any]: (state: any, action) => {
      const deletePostData = state.posts.findIndex(
        (post: { _id: string }) => post._id === action.meta.arg._id
      )
      state.posts.splice(deletePostData, 1)
    }
  }
})

export const selectAllPosts = (state: any) => state.postData.posts

export default postsSlice.reducer