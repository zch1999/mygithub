import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'

import Layout from '../components/layout'
import MyContext from '../lib/my-context'
import store from '../store/store'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    // console.log('app init')
    let pageProps 
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    // console.log(Component)
    return (
      // <Container>
        <Layout>
          <Provider store={store}>
            <MyContext.Provider value="test">
              <Component {...pageProps}/>
            </MyContext.Provider>
          </Provider>
        </Layout>
      // </Container>
    )
  }
}

export default MyApp