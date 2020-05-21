import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'

import Layout from '../components/layout'

import testHoc from '../lib/with-redux'

class MyApp extends App {

  static async getInitialProps(ctx) {
    // console.log('app init')
    const { Component } = ctx
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    // console.log(Component)
    return (
      // <Container>
      <Provider store={reduxStore}>
        <Layout>
              <Component {...pageProps}/>
        </Layout>
      </Provider>
      // </Container>
    )
  }
}

export default testHoc(MyApp)