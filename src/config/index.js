// install

// 创建 data/db data/log/mongidb.log

// mongod -dbpath "F:\Program Files\MongoDB\Server\4.2\data\db" -logpath "F:\Program Files\MongoDB\Server\4.2\data\log\MongoDB.log" -install -serviceName "MongoDB"

// install mongoose saslprep

const DB_URL = 'mongodb://127.0.0.1/test'

const JWT_SECRET = '123456'
export default {
  DB_URL,
  JWT_SECRET
}