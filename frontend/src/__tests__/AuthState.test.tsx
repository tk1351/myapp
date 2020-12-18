import React from 'react'
import { screen, render } from '@testing-library/react'
import AuthState from '../components/AuthState'
import * as firebase from '@firebase/rules-unit-testing'
import { auth } from '../firebase'

describe('Rendering', () => {
  it('Should render exactlly', () => {
    render(<AuthState />)
    auth.useEmulator('http://localhost:9099/')

    screen.debug()

    Promise.all(firebase.apps().map((app) => app.delete()))
  })
})
