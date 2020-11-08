'use strict'
module.exports = (sequelize, DataTypes) => {
  const exerciseCategory = sequelize.define('exercisesCategory', {
    categoryName: DataTypes.STRING
  }, {})
  exerciseCategory.associate = function (models) {
    exerciseCategory.hasMany(models.exercises, {
      foreignKey: 'exerciseCategory',
      as: 'exerciseCategory'
    })
  }
  return exerciseCategory
}
