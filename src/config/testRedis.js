import { setValue, getValue, getHValue } from './RedisConfig'

setValue('test', 'test message from redis client')

getValue('test').then(res => {
  console.log(res)
})

setValue('testobj', {
  name: 'brian',
  age: 30,
  email: 'xx@qq.com'
})

getHValue('testobj').then(res => {
  console.log('getHValue,' + JSON.stringify(res))
})

