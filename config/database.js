const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_email_app", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
const dataBaseConnection = async () => {
    try {
        await sequelize.authenticate().then(() => {
            console.log("database connected successfully");
        }).catch((error) => {
            console.error('Unable to connect to the database:', error.message);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}
module.exports = { dataBaseConnection, sequelize };