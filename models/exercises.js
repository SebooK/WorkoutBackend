'use strict';
module.exports = (sequelize, DataTypes) => {
  const exercises = sequelize.define('exercises', {
    exerciseName: DataTypes.STRING,
    exerciseCategory: DataTypes.INTEGER,
    exerciseDescription: DataTypes.STRING,
    exerciseImg: DataTypes.STRING,
    workoutId: DataTypes.INTEGER
  }, {});
  exercises.associate = function(models) {
    // associations can be defined here
  };
  return exercises;
};