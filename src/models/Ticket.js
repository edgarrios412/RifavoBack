const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('ticket', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    fechaCompra: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },{timestamps:false});
};