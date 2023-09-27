const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database")
const emailModel = sequelize.define("email_tbls", {
    emailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    froms: {
        type: DataTypes.TEXT
    },
    tos: {
        type: DataTypes.TEXT
    },
    ccc: {
        type: DataTypes.TEXT
    },
    subject: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.TEXT,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    message: {
        type: DataTypes.TEXT,
    },

})
module.exports = emailModel;