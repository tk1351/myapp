import React, { useEffect } from 'react'
import axios from 'axios'

interface PostData  {
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

const Post: React.FC<PostData> = (props) => {
  useEffect(() => {
    const fetchPostsData = async () => {
      const url = '/api/v1/post'
      await axios.get(url).then((res) => {
        res.data.map((post: PostData) => ({
          _id: post._id,
          uid: post.uid,
          title: post.title,
          text: post.text
        }))
      })
    }
    return () => {
      fetchPostsData()
    }
  }, [props._id])

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  )
}

export default Post
