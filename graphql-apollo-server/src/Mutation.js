const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const lodash = require('lodash')
const { sendConfirmationEmail } = require('./services/EmailService')

require('dotenv').config()
const { Character, validateCharacter } = require('./model/Character')
const { User, validateUser } = require('./model/User')

const Mutation = {
  addCharacter(_, payload) {
    const { value, error } = validateCharacter(payload, { abortEarly: false })
    if (error) {
      throw new UserInputError('Failed to create character due to validation errors', {
        validationError: error.details
      })
    }
    return Character.create(value)
  },
  
  async signup(_, {user}) {
    const { value, error } = validateUser(user, { abortEarly: false })
    if (error) {
      throw new UserInputError('Failed to signup due to validation errors', {
        validationError: error.details
      })
    }
    const password = await bcrypt.hash(user.password, 10)
    const registerUser = await User.create({
      ...value,
      password // перезаписывает значение у ключа password (поэтому порядок важен)
    })
    
    sendConfirmationEmail(registerUser)

    const token = await jwt.sign({
      _id: registerUser._id
    }, process.env.JWT_SECRET_KEY)

    return { 
      token,
      user: lodash.pick(registerUser, ['id', 'name', 'email'])
    }
  }
}

module.exports = Mutation