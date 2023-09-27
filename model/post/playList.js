const { DataTypes } = require("sequelize");
const { sequelize } = require('../../config/database')
const playListModel = sequelize.define("play_list_tbls", {
    playListId: {
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
    }
});
module.exports = playListModel;