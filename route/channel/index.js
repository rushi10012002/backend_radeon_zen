const express = require("express");
const { createAndCheckChannelController } = require("../../controller/channel");
const router = express.Router();
const multer = require("multer")
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("Upload")) {
            fs.mkdirSync("Upload")
        }
        if (!fs.existsSync("Upload/images")) {
            fs.mkdirSync("Upload/images")
        }
        cb(null, "Upload/images")
    },
    filename: function (req, file, cb) {
        // console.log(";;;;;;;;;;;;;");
        // console.log(file);
        // console.log(req.files);
        // console.log(";;;;;;;;;;;;;");
        cb(null, Date.now() + file.originalname)
    }
})
const Upload = multer({
    storage: storage
})

router.post("/new-channel", Upload.fields([{
    name: "profilePath",
    maxCount: 1
}]), createAndCheckChannelController)
module.exports = router;
