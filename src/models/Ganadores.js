const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('ganadores', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    premioEntregado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    premioNumero: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
  },{timestamps:false});
};