import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddPost from './components/AddPost'
import Feed from './components/Feed'
import Auth from './components/Auth'
import SearchResult from './components/SearchResult'
import SinglePostPage from './components/SinglePostPage'
import EditPost from './components/EditPost'

const Routes: React.FC = () => {
  const q = useSelector((state: any) => state.queryParams).slice(-1)[0].values.q

  return <div>
    <Switch>
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/add" component={AddPost} />
      <Route exact path="/login" component={Auth} />
      <Route exact path={`/search?q=${q}`} component={SearchResult} />
      <Route exact path={"/post/detail/:id"} component={SinglePostPage} />
      <Route exact path="/post/edit/:id" component={EditPost} />
    </Switch>
  </div>
}

export default Routes
