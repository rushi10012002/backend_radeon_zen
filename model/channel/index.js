const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")

const channelModel = sequelize.define("channel_tbls", {
    channelId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: true
    },
    name: {
        type: DataTypes.TEXT,
    },
    bio: {
        type: DataTypes.TEXT
    },
    type: {
        type: DataTypes.TEXT
    },
    profilePath: {
        type: DataTypes.TEXT
    },
    coverPath: {
        type: DataTypes.TEXT
    }
})
module.exports = channelModel;