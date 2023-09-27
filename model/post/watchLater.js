const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")
const watchModel = sequelize.define("watch_tbls", {
    watchId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER,
        references: true
    },
    userId: {
        type: DataTypes.INTEGER,

    }
})
module.exports = watchModel;