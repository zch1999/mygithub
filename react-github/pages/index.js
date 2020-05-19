import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { connect } from 'react-redux'

import { add } from '../store/store'

const Index =  ({ counter, username, rename, add}) => {
  function gotoTestB(){
    Router.push({
      pathname: '/test/b',
      query: {
        id: 2
      }
    },'/test/b/2')
  }

  return (
    <>
      <span>Count: {counter}</span>
      <span>username: {username}</span>
      <input value={username} onChange={(e) => rename(e.target.value) } />
      <button onClick={ () => add(counter)} >add</button>
    </>)
}

Index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch(add(3))
  return {}
}

// React.createElement('span', {}, 'Index')
export default connect(function mapStateToProps(state) {
  return {
    counter: state.count.count,
    username: state.user.username
  }
},function mapDispatchToProps(dispatch){
  return {
    add: (num) => dispatch({ type: 'ADD', num }),
    rename: (name) => dispatch( {type: 'UPDATE_USERNAME', name})
  }
})(Index)