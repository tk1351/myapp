import React from 'react'
import { Link, Router } from 'react-router-dom'
import history from '../history'

const Home: React.FC = () => {
  return (
    <div>
      <h1>あなたのビジネスに役立つICT製品がきっと見つかる!</h1>
      <div>
        <p>
          <Router history={history}>
            <Link to={'/login'}>
              ログイン・新規登録はこちらから
            </Link>
          </Router>
        </p>
        <h3>幅広い製品情報を網羅!</h3>
      </div>
    </div>
  )
}

export default Home
