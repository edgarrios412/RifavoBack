const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('sorteo', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mindesc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaSorteo: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: () => new Date()
    },
    precioTicket: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0
    },
    cantidadTicket: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1000,
    },
    premio1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mindescP1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    premio2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mindescP2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    premio3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mindescP3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numTicketGanadorP1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numTicketGanadorP2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numTicketGanadorP3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    multiplo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },{timestamps:false});
};