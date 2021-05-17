import svgCapcha from 'svg-captcha'
import { setValue, getValue } from '@/config/RedisConfig'

class PublicController {
  constructor() {

  }
  async getCaptcha (ctx) {
    const { sid } = ctx.request.query

    const newCaptcha = svgCapcha.create({
      size: 4,
      ignoreChars: '0oOil1',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    })

    // 保存图片验证码数据，设置超时时间 600s 10分钟
    setValue(sid, newCaptcha.text, 10 * 60)

    ctx.body = {
      code: 200,
      msg: newCaptcha.data
    }
  }
}

export default new PublicController()