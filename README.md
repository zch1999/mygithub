# mygithub
 - nextjs
  自带数据同步策略，解决同构项目最大难点
  丰富的插件
  灵活的配置  

  - 技术栈
  1. Nextjs提供同构渲染
  2. Koa提供数据接口和服务端路由
    - 轻量级，易于扩展
  3. Redis提供session存储
  4. OAuth认证体系
    - 实现流程
    - 安全性如何保证
  5. React React-Hooks
   - 什么是hooks
   - 各种hooks的使用方法及注意事项
   - hooks中存在的问题以及如何解决
  6. redux

  nextjs带有服务器，但是只能处理ssr


  - 路由设置
    <Link></Link> 需要指定渲染内容
    例如跳转到页面，只能是唯一结点
    ```js
      <Link href="/a">
        <Button>index</Button>
      </Link>
    ```
