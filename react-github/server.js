const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const session = require('koa-session')
const Redis = require('ioredis')

const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const RedisSessionStore = require('./server/session-store')
//创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const router = new Router()
  const server = new Koa()

  server.keys = ['zch lai le']
  const SESSION_CONFIG= {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  //配置处理github oauth的登录
  auth(server)

  
  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    // console.log(id)
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  router.get('/api/user/info', async (ctx) => {
    // const id = ctx.params.id
    // // console.log(id)
    // await handle(ctx.req, ctx.res, {
    //   pathname: '/a',
    //   query: { id }
    // })
    // ctx.respond = false
    const user = ctx.session.userInfo
    console.log(user)
    if(!user){
      ctx.status = 401
      ctx.body = 'Need Login'
    }else{
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userid:sxxxxx')
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    // next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})

