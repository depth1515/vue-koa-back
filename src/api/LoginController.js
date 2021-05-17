import send from '../config/mailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from './../config'
import { checkCode } from '@/common/Utils'
import User from './../model/User'
import bcrypt from 'bcrypt'

class LoginController {
  constructor() {

  }

  async forget (ctx) {
    // post 请求
    const { body } = ctx.request

    try {

      let result = await send({
        code: body.code,
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'bbbring'
      })

      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }

    } catch (error) {
      console.log(error)
    }
  }

  async login (ctx) {
    // 返回token
    /**
     * 过期时间 1
     * {
     *  _id: 'brian',
     *  exp: xxx
     * }
     * 过期时间 2
     * {
     *  expiresIn: '1d'
     * }
     */
    // 接收数据

    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    // 验证图片验证码的时效性，正确性
    let result = await checkCode(sid, code)
    if (result) {
      // 验证用户账号密码正确性
      console.log('check ok')
      let checkUserPassword = false
      let user = await User.findOne({
        username: body.username
      })
      console.log(user)
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPassword = true
      }
      // mongo
      if (checkUserPassword) {
        let token = jsonwebtoken.sign({
          _id: 'brian',
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        }, config.JWT_SECRET)
        ctx.body = {
          code: 200,
          token
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名或密码错误不正确'
        }
      }

    } else {
      // 图片验证码校验
      ctx.body = {
        code: 401,
        msg: '验证码不正确'
      }
    }

  }

  async reg (ctx) {
    // 接收数据
    const { body } = ctx.request
    let { username, name, password, code } = body
    password = await bcrypt.hash(password, 5)
    // 校验验证码规则
    let sid = body.sid
    let msg = {}
    // 验证图片验证码的时效性，正确性
    // 查库，查看username是否被注册
    // 查看name是否被注册
    // 写入数据
    let result = await checkCode(sid, code)
    let check = true
    if (result) {
      let user1 = await User.findOne({ username })
      if (user1 && typeof user1.username !== 'undefined') {
        msg.username = ['此邮箱已经注册,可以通过邮箱找回密码']
        check = false
      }
      let user2 = await User.findOne({ name })
      if (user2 && typeof user2.name !== 'undefined') {
        msg.name = ['此昵称已经注册,请修改']
        check = false
      }
      if (check) {
        let user = new User({
          username,
          name,
          password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })

        let result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.code = ['验证码已经失效,请重新获取！']
    }
    ctx.body = {
      code: 500,
      msg
    }
  }
}

export default new LoginController