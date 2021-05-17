
export default (ctx, next) => {
  return next().catch(err => {
    if (401 === err.status) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource,use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message
        // err.stack 能查看到定位到错误位置
      })
      if (process.env.NODE_ENV === 'development') {
        console.log(err.stack)
      }
    }
  })
}
