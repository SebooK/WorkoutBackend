'use strict'
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING

  }, {})

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }
  })

  User.prototype.comparePassword = (bodypassword, password) => {
    bcrypt.compare(bodypassword, password)
    console.log(this.password)
  }

  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
