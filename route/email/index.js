const express = require("express")
const { newEmailController, getListEmails, updateStatusEmailController, emailDetailsController } = require("../../controller/emails")
const router = express.Router()
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

router.get("/list", getListEmails)
router.get("/list/:id", emailDetailsController)
router.post("/new-email", Upload.fields([{
    name: "images",
    maxCount: 5
}]), newEmailController)
router.put("/status", updateStatusEmailController)
router.delete("/delete", (req, res) => {
    return res.json({
        message: "E-mail deleted successfully",
        code: "1111"
    })
})

module.exports = router