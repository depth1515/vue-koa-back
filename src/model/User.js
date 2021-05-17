import mongoose from '../config/DBHelper'

const Schame = mongoose.Schema

const UserSchema = new Schame({
  'username': {
    type: String
  },
  'name': {
    type: String
  },
  'password': {
    type: String
  }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
