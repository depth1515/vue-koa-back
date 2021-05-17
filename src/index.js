/**
 * 多个npm同时运行 npm-run-all
 */

/**
 * 加密
 * bcrypt
 */

import Koa from 'koa'
import koaBody from 'koa-body'
import koaJson from 'koa-json'
// 跨域
import cors from '@koa/cors'
// 整合中间件
import compose from 'koa-compose'
// 整合压缩
import compress from 'koa-compress'

import JWT from 'koa-jwt'

const path = require('path')
// 安全头
const hetmet = require('koa-helmet')
// 静态文件
const statics = require('koa-static')

import config from './config'

import errorHandle from './common/ErrorHandle'

const app = new Koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true

const { routes: router } = require('./routes/routes')


// 定义公共路径，不需要使用鉴权
// unless api路径不校验
// 没有产生，没有校验，拥有功能
// 使用jsonwebtoken
const jwt = JWT({ secret: config.JWT_SECRET })
  .unless({ path: [/^\/public/, /^\/login/] })

// app
// .use(hetmet())
// .use(statics(path.join(__dirname,'../public')))

// 使用 compose 整合中间件
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  koaJson({ pretty: false, param: 'pretty' }),
  hetmet(),
  errorHandle,
  jwt
])

if (!isDevMode) {
  app.use(compress())
}

app
  .use(middleware)
  .use(router())

app.listen(3005, () => {
  console.log('server at 3005')
})
