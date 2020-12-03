import React, { useState } from 'react'
import { auth, provider } from '../firebase'
import { updateUserProfile } from '../features/userSlice'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CameraIcon from '@material-ui/icons/Camera'
import EmailIcon from '@material-ui/icons/Email'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1606638436412-23517031f19a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Auth: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password)

    await authUser.user?.updateProfile({
      displayName: username,
    })
    dispatch(
      updateUserProfile({
        displayName: username,
      })
    )
  }

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form className={classes.form} noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value)
                  }}
                />
              </>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInEmail()
                      } catch (err) {
                        alert(err.message)
                      }
                    }
                  : async () => {
                      try {
                        await signUpEmail()
                      } catch (err) {
                        alert(err.message)
                      }
                    }
              }
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Create new account?' : 'Back to login'}
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<CameraIcon />}
              onClick={signInGoogle}
            >
              Sign In with Google
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Auth
