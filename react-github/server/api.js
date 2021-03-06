const axios = require('axios')

const GITHUB_BASE_URl = 'https://api.github.com'

module.exports = (server) => {
  server.use(async(ctx, next) => {
    const path = ctx.path
    console.log(path,ctx.url)
    if(path.startsWith('/github/')){
      const githubAuth = ctx.session.githubAuth
      const githubPath = `${GITHUB_BASE_URl}${ctx.url.replace('/github/','/')}`

      const token = githubAuth && githubAuth.access_token
      let headers = {}
      if(token){
        headers['Authorization'] = `${githubAuth.token_type} ${token}`
      }

      try {
        const result = await axios({
          methods: 'GET',
          url: githubPath,
          headers 
        })
        if(result.status == 200) {
          ctx.body = result.data
          ctx.set('Content-Type', 'application/json')
        }else {
          ctx.status = result.status
          ctx.body = {
            success: false,
          }
          ctx.set('Content-Type', 'application/json')
        }
      } catch(err) {
        console.log(err)
        ctx.body = {
          success: false,
        }
        ctx.set('Content-Type', 'application/json')
      }
    }else {
      await next()
    }
  })
}