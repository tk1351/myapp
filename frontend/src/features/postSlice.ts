import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { values } from '../components/AddPost'

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
  async (newValues: values) => {
    const url = '/api/v1/post'
    const res = await axios.post(url, newValues)
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
  }
})

export const selectAllPosts = (state: any) => state.postData.posts

export default postsSlice.reducer