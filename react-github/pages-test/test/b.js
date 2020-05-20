import React, {useState, useReducer,memo,useMemo,useContext, useLayoutEffect, useEffect, useCallback, useRef} from 'react'

import myContext from '../../lib/my-context'

class MyCount extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.setState({
    //     count: this.state.count + 1
    //   })
    // }, 1000);
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
  return <span>{this.state.count}</span>
  }
}

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default: 
      return state
  }
}

function MycountFunc() {
  // const [count,setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name,setName] = useState('zch1999')

  const countRef = useRef()
  countRef.current = count

  const config = useMemo(() =>({
    text: `count is ${count}`,
    color: count > 3 ? 'red': 'blue'
  }), [count])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(count => count+1)
  //     dispatchCount({ type: 'minus'})
  //   }, 1000)
  //   return () => clearInterval(interval)
  // },[])

  // useEffect(() => {
  //   console.log('effet invoked')
  //   return () => console.log('effect deteled')
  // },[])

  // const handleButtonClick = useCallback(() => dispatchCount({ type: 'add'}),[])

  const handleButtonClick = useMemo(
    () => ()=> dispatchCount({ type: 'add'}),
    []
  )

  const handleAlertButtonClick = function(){
    setTimeout(() => {
      alert(countRef.current)
    }, 2000);
  }

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <Child 
        config={config}
        onButtonClick={handleButtonClick} />
        <button onClick={handleAlertButtonClick}>alert count</button>
    </div>
  )
}

const Child = memo(function Child({ onButtonClick, config }){
  // console.log('child render')
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  )
})
export default MycountFunc