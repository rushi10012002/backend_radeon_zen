const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")
const filesModel = sequelize.define("files_tbls", {
    filesId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    emailId: {
        type: DataTypes.INTEGER,
        references: true
    },
    filesPath: {
        type: DataTypes.TEXT,
    },
    mimetype: {
        type: DataTypes.TEXT,
    },
    orgName: {
        type: DataTypes.TEXT,
    },
    size: {
        type: DataTypes.INTEGER,
    }


})
module.exports = filesModel;