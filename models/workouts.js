'use strict'
module.exports = (sequelize, DataTypes) => {
  const workouts = sequelize.define('workouts', {
    workoutName: DataTypes.STRING,
    workoutCategory: DataTypes.INTEGER,
    workoutDescription: DataTypes.STRING,
    userId:DataTypes.INTEGER,
  }, {})
  workouts.associate = function (models) {
    workouts.hasMany(models.exercises, {
      foreignKey: 'workoutId',
      as:'Exercises'
    })
    workouts.belongsTo(models.User, {
      foreignKey:'userId',
      as: 'user'
    })
  }
  return workouts
}
