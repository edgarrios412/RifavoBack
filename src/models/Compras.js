const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('compras', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    tickets: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: []
    },
    monto:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
  },{timestamps:false});
};