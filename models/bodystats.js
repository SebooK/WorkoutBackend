'use strict';
module.exports = (sequelize, DataTypes) => {
  const bodyStats = sequelize.define('bodyStats', {
    date: DataTypes.DATE,
    weight: DataTypes.FLOAT,
    neck: DataTypes.FLOAT,
    chest: DataTypes.FLOAT,
    wrist: DataTypes.FLOAT,
    upperarm: DataTypes.FLOAT,
    forearm: DataTypes.FLOAT,
    waist: DataTypes.FLOAT,
    hip: DataTypes.FLOAT,
    thigh: DataTypes.FLOAT,
    calf: DataTypes.FLOAT
  }, {});
  bodyStats.associate = function(models) {
    // associations can be defined here
  };
  return bodyStats;
};