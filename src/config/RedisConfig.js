import redis from 'redis'


const options = {
  host: '127.0.0.1',
  port: 6379,
  password: '123456',
  detect_buffers: true,
  // 策略，错误
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}
const { promisify } = require("util");

const client = redis.createClient(options)

client.on('error', err => {
  console.log('Redis client Error:' + err)
})

// 没有判断value值
// value如果是对象  使用hash表
const setValue = (key, value, time) => {
  if (typeof value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

const getAsync = promisify(client.get).bind(client);


const getValue = (key) => {
  return getAsync(key)
}

const getHAsync = promisify(client.hgetall).bind(client)

const getHValue = (key) => {
  return getHAsync(key)
}

const delValue = (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully');
    } else {
      console.log('delete redis key error:' + err)
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}
