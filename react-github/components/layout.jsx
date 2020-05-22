import { useState, useCallback } from 'react'
import getConfig from 'next/config'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Button, Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '../store/store'
import axios from 'axios'
import Container from './Container'
import { withRouter } from 'next/router'

const { Header, Content, Footer } = Layout

const { publicRuntimeConfig } = getConfig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: 'center'
}

const Comp = ({ color, children, style }) => <div style={{color, ...style}}>{children}</div>

function MyLayout ({ children, user, logout, router }) {
  const [search,setSearch] = useState('')

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  },[setSearch])

  const handleOnSearch = useCallback(() => {

  },[])

  const handleLogout = useCallback(() => {
    logout()
  },[logout])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href=""  onClick={handleLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

  const handleGotoOAuth = useCallback((e) => {
    e.preventDefault()
    axios.get(`/prepare-auth?url=${router.asPath}`)
      .then(resp => {
        if(resp.status == 200){
          location.href = publicRuntimeConfig.OAUTH_URL
        }else {
          console.log('prepare auth fail', resp)
        }
      }).catch(err => {
        console.log('prepare auth fail', err)
      })
  },[])

  return(
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined  style={githubIconStyle}/>
              </Link>
            </div>
            <div>
              <Input.Search 
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
                />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                    <a href="/">
                      <Avatar size={40} src={user.avatar_url}/>
                    </a>
                  </Dropdown>
                ) : (
                  <Tooltip title="点击登录">
                    <a href={`/prepare-auth?url=${router.asPath}`} >
                      <Avatar size={40} icon={<UserOutlined />}/>
                    </a>
                  </Tooltip>
                )
              }
              {/* <UserOutlined style={{fontSize:'40px', color: 'white'}}/> */}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container >
            {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        Develop 
        <a href="1901394767@qq.com">zch1999</a>
      </Footer>
      <style jsx>{`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
            justify-content: flex-start;
          }
          .content {
            color: red;
          }
        `}</style>
      <style jsx global>{`
        #__next{
          height: 100%
        }
        .ant-layout {
          min-height: 100%
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
}, function mapReducer(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
})(withRouter(MyLayout))