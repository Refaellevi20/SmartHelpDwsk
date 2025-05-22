import { createStore, combineReducers } from 'redux'

import { userReducer } from './user/user.reducer.js'

import { systemReducer } from './system/system.reducer.js'


const rootReducer = combineReducers({
  userModule: userReducer,
  systemModule: systemReducer,

})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  // console.log('**** Store state changed: ****')
  // console.log('storeState:\n', store.getState())
  // console.log('*******************************')
})
