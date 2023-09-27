const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")

const channelModel = sequelize.define("channel_live_tbls", {
    liveId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    channelId: {
        type: DataTypes.INTEGER,
        references: true
    },
    roomId: {
        type: DataTypes.TEXT,
    }
})
module.exports = channelModel;