import { userService } from '../../services/user/user.service.remote.js'
import { store } from '../store.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from '../system/system.reducer.js'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, CLEAR_NOTIFICATIONS, } from './user.reducer.js'

export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START })
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.log('UserActions: error in loadUsers', err)
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId)
    store.dispatch({ type: REMOVE_USER, userId })
  } catch (err) {
    console.log('UserActions: error in removeUser', err)
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER,user, })
    return user
  } catch (err) {
    console.log('Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({type: SET_USER,user, })
    return user
  } catch (err) {
    console.log('Cannot signup', err)
    throw err
  }
}

export async function updateUser(user) {
  try {
    const updatedUser = await userService.updateUser(user)
    store.dispatch({ type: SET_USER,user: updatedUser, })
    return updatedUser
  } catch (err) {
    console.log('Cannot update user', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({type: SET_USER,user: null,})
    store.dispatch({type: CLEAR_NOTIFICATIONS,}) //* notifications to the correct user
  } catch (err) {
    console.log('Cannot logout', err)
    throw err
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_WATCHED_USER, user })
  } catch (err) {
    showErrorMsg('Cannot load user')
    console.log('Cannot load user', err)
  }
}
