import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {
  count: 0
}

const userInitialState = {
  username: 'zch1999'
}

function add(num){
  return {
    type: ADD,
    num,
  }
}
const ADD = 'ADD'
function counterReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1)}
    default: 
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action){
  switch (action.type) {
    case UPDATE_USERNAME :
      return { ...state, username: action.name}
    default :
      return state
  }
}

const allReducer = combineReducers({
  count: counterReducer,
  user: userReducer
})
const store = createStore(
  allReducer, 
  {
    count:initialState, 
    user: userInitialState
  },
  applyMiddleware(ReduxThunk)
)

function addAsync(num){
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000);
  }
}

console.log(store.getState())
store.dispatch(add(3))
console.log(store.getState())

store.subscribe(() => {
  console.log('change',store.getState())
})

store.dispatch(addAsync(5))
store.dispatch({type: UPDATE_USERNAME, name: 'zch1512'})


export default store