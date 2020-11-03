'use strict';
module.exports = (sequelize, DataTypes) => {
  const workouts = sequelize.define('workouts', {
    workoutName: DataTypes.STRING,
    workoutCategory: DataTypes.INTEGER,
    workoutDescription: DataTypes.STRING
  }, {});
  workouts.associate = function(models) {
    // associations can be defined here
  };
  return workouts;
};