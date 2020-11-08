'use strict'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password can not be null',
        },
        len: {
          args: [8, 255],
          msg: 'Length of password must be min 8 chars'
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg: 'The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase and one digit'
        }
      }
    },
    email: DataTypes.STRING,
    firstName: DataTypes.STRING

  }, {
    hooks: {
      beforeCreate: function (user) {
        user.password = bcrypt.hashSync(user.password, 10);
      },
      beforeUpdate: function (user) {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    }
  })

  User.prototype.generateAuthToken = function () {
    const accessToken = jwt.sign({
      id: this.id,
      username: this.username
    },process.env.ACCESS_TOKEN_SECRET,{
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
    console.log(this.id)
    console.log(accessToken)
    return accessToken
  }

  User.associate = function (models) {
    User.hasOne(models.bodyStats, {
      foreignKey:'userId',
      as:'bodyStats'
    })
    User.hasMany(models.workouts, {
      foreignKey:'userId',
      as:'workout'
    })
  }
  return User
}
