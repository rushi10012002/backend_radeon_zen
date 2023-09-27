const { DataTypes } = require("sequelize");
const { sequelize } = require('../../config/database')
const collectionModel = sequelize.define("play_list_collection_tbls", {
    collectionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    playListId: {
        type: DataTypes.INTEGER,
        references: true

    },
    postId: {
        type: DataTypes.INTEGER,
    }
});
module.exports = collectionModel;