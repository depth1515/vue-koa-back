const combineRouters = require('koa-combine-routers')

import PublicRouter from './PublicRouter'
import LoginRouter from './LoginRouter'

export const routes = combineRouters(
  PublicRouter,
  LoginRouter
)
