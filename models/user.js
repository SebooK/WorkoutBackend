'use strict'

import jwt from 'jsonwebtoken'
import { Sequelize } from 'sequelize'


export default class User extends Sequelize.Model {
  static init(sequelize,DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
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
      sequelize,
      modelName: 'user',
      hooks: {
        beforeCreate: function (user) {
          user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeUpdate: function (user) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    })
  }
  generateAuthToken = () => {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign({
      id: this.id,
      username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
    console.log(this.id)
    console.log(accessToken)
    return accessToken
  }
  associate(models) {
    this.userAssociation = this.hasOne(models.bodyStats);
    this.userAssociation = this.hasMany(models.workouts)
  }
}





