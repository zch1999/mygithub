import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
 

const userInitialState = {}

const LOGOUT = 'LOGOUT'

function userReducer(state = userInitialState, action){
  switch (action.type) {
    case LOGOUT: {
      return {}
    }
    default :
      return state
  }
}

const allReducer = combineReducers({
  user: userReducer
})

//action 退出登录
export function logout() {
  return dispatch => {
    axios.post('/logout')
      .then(resp => {
        if(resp.status == 200){
          dispatch({
            type: LOGOUT
          })
        }else {
          console.log('logout fail',resp)
        }
      }).catch(err => {
        console.log('logout fail',err)
      })
  }
}
// console.log(store.getState())
// store.dispatch(add(3))
// console.log(store.getState())

// store.subscribe(() => {
//   console.log('change',store.getState())
// })

// store.dispatch(addAsync(5))
// store.dispatch({type: UPDATE_USERNAME, name: 'zch1512'})


export default function initializeStore(state) {
  const store = createStore(
    allReducer, 
    Object.assign({}, { 
      user: userInitialState
    }, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )

  return store
}