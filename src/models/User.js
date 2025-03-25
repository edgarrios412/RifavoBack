const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:1,
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    role:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    income:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0,
    },
    firstDiscount:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    },
    father:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:null,
    },
    tag:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};