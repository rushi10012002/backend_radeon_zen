const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")
const postModel = sequelize.define("posts_tbls", {
    postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    channelId: {
        type: DataTypes.INTEGER,
        references: true
    },
    coverPath: {
        type: DataTypes.TEXT,
    },
    videoPath: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT,
    },
    subTitle: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.BOOLEAN
    }



})
module.exports = postModel;