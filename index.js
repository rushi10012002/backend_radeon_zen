const express = require('express')
const path = require('path')
const cors = require('cors')
const { dataBaseConnection } = require("./config/database")
const mailRoutes = require("./route/email")
const userRoutes = require("./route/user")
const channelRoutes = require("./route/channel")
const postRoutes = require("./route/post")
const app = express()
const port = 8000


app.use('/Upload', express.static(path.join(__dirname, "Upload")))
app.use(cors())
app.use(express.json())
dataBaseConnection()
app.use('/api/v1/e-mail', mailRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/channel', channelRoutes)
app.use('/api/v1/post', postRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))