import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
    case 'SIGNIN':
      return {
        errorMessage: '',
        token: action.payload
      }
    case 'SIGNOUT':
      return {
        token: null,
        errorMessage: '' 
      }
    case 'ADD_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state
  }
}

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signup', { email, password })
    await AsyncStorage.setItem('token', data.token)
    dispatch({
      type: 'SIGNUP',
      payload: data.token
    })
    navigate('TrackList')
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with signup'
    })
  }
}

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signin', { email, password })
    await AsyncStorage.setItem('token', data.token)
    dispatch({
      type: 'SIGNIN',
      payload: data.token
    })
    navigate('TrackList')
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with signin'
    })
  }
}

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({
    type: 'SIGNOUT'
  })
  navigate('loginFlow')
}

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({
      type: 'SIGNIN',
      payload: token
    })
    navigate('TrackList')
  } else {
    navigate('Signup')
  }
}

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: 'CLEAR_ERROR'
  })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
)
