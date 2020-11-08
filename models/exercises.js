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
    exercises.belongsTo(models.exercisesCategory, {
      foreignKey: 'exerciseCategory',
      as: 'categoryOfExercise'
    })

    exercises.belongsTo(models.workouts), {
      foreignKey: 'workoutId',
      as: 'Exercises'
    }

  };
  return exercises;
};
