'use strict'
module.exports = (sequelize, DataTypes) => {
  const exerciseCategory = sequelize.define('exerciseCategory', {
    categoryName: DataTypes.STRING
  }, {})
  exerciseCategory.associate = function (models) {
    // associations can be defined here
  }
  return exerciseCategory
}
