import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddPost from './components/AddPost'
import Feed from './components/Feed'
import Auth from './components/Auth'
import SearchResult from './components/SearchResult'
import SinglePostPage from './components/SinglePostPage'
import EditPost from './components/EditPost'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'
import NotFound from './components/NotFound'
import CategoryPage from './components/CategoryPage'
import AdminScreen from './components/Admin/AdminScreen'
import AdminUsersList from './components/Admin/AdminUsersList'
import AdminPostsList from './components/Admin/AdminPostsList'
import AdminPostDetail from './components/Admin/AdminPostDetail'
import Home from './components/Home'

const Routes: React.FC = () => {
  const q = useSelector((state: any) => state.queryParams).slice(-1)[0].values.q

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/add" component={AddPost} />
          <Route exact path="c" component={Auth} />
          <Route exact path={`/search?q=${q}`} component={SearchResult} />
          <Route exact path={'/post/detail/:id'} component={SinglePostPage} />
          <Route exact path="/post/edit/:id" component={EditPost} />
          <Route exact path="/user/profile/:id" component={UserProfile} />
          <Route exact path="/user/edit/:id" component={EditProfile} />
          <Route exact path="/category/:id" component={CategoryPage} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/admin/user" component={AdminUsersList} />
          <Route exact path="/admin/post" component={AdminPostsList} />
          <Route exact path="/admin/post/:id" component={AdminPostDetail} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
  )
}

export default Routes
