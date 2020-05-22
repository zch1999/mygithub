import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Router from 'next/router'
import 'antd/dist/antd.css'
import Link from 'next/link'
import Layout from '../components/layout'
import PageLoading from '../components/PageLoading'
import testHoc from '../lib/with-redux'
import axios from 'axios'

class MyApp extends App {

  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  shopLoading = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    console.log('+++')
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.shopLoading)
    Router.events.on('routeChangeError', this.shopLoading)

    axios.get('/github/search/repositories?q=react')
      .then(resp => {
        console.log(resp)
      })
  }

  componentWillUnmount() {
    console.log('---')
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.shopLoading)
    Router.events.off('routeChangeError', this.shopLoading)
  }

  static async getInitialProps(ctx) {
    console.log('app init')
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
        { this.state.loading ? <PageLoading /> : null }
        <Layout>
          <Link href="/">
            <a>Index</a>
          </Link>
          <Link href="/detail">
            <a>Detail</a>
          </Link>
          <Component {...pageProps}/>
        </Layout>
      </Provider>
      // </Container>
    )
  }
}

export default testHoc(MyApp)