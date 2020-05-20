import { withRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Link from 'next/link'
// import Comp from '../components/comp'
// import moment from 'moment'

const Comp = dynamic(import('../components/comp'))

const Title = styled.h1`
color: yellow;
font-size: 40px;
`

const A = ({ router, name, time }) => (
  <>
  <Title>this is title{time}</Title>
  <Comp />
  <Link href="#aaa">
    <a className="link">
      A {router.query.id} {name}{process.env.customKey}
    </a>
  </Link>
  <style jsx>{`
    a {
      color: blue;
    }
    .link {
      color: red
    }
  `}
  </style>
  </>
)

A.getInitialProps = async() => {
  const moment = await import('moment')
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'zch',
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    }, 1000);
  })
  return await promise
}

export default withRouter(A)