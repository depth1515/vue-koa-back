import Users from './test'

// 增
const user = {
  name: 'brian1',
  age: 21,
  email: 'brian1@qq.com'
}

const saveUser = async () => {
  const data = new Users(user)
  const result = await data.save()
  console.log(result)
}

// 查

const findUser = async () => {
  const result = await Users.find()
  console.log(result)
}

// 改

const changeUser = async () => {
  const result = await Users.updateOne(
    {
      name: 'brian',
    },
    {
      age: 25,
      email: 'brian2222@qq.com'
    }
  )
  console.log(result)
}

// 删

const deleteUser = async () => {
  const result = await Users.deleteOne(
    { name: 'brian' }
  )
  console.log(result)
}

// saveUser()
// changeUser()
// deleteUser()
// findUser()