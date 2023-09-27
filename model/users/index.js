const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")
const usersModel = sequelize.define("users_tbls", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
    },
    email: {
        type: DataTypes.TEXT,
    },
    sub: {
        type: DataTypes.TEXT,
    },
    picture: {
        type: DataTypes.TEXT,
    },



})
module.exports = usersModel;