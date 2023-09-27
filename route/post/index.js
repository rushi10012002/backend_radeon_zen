const express = require("express");
const router = express.Router();
const multer = require("multer")
const fs = require('fs');
const { createPostController, getVideoListController, updatePostController, getVideoListByTypeController, upDateStatusController, postWatchLaterVideo, getWatchList, newPlayList, getPlayList, newCollectionPlayList, getCollectionPlayList, getVideoListPublicController } = require("../../controller/post");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("Upload")) {
            fs.mkdirSync("Upload")
        }
        if (!fs.existsSync("Upload/video")) {
            fs.mkdirSync("Upload/video")
        }
        cb(null, "Upload/video")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const Upload = multer({
    storage: storage
})

router.post("/new-post", Upload.fields([{
    name: "video",
    maxCount: 1
}]), createPostController)
router.post("/update-post", Upload.fields([{
    name: "coverPath",
    maxCount: 1
}]), updatePostController)

router.get("/get-video", getVideoListController)
router.get("/public/videos", getVideoListPublicController)
router.post("/new-playlist", newPlayList)
router.get("/get-playlist", getPlayList)
router.post("/new-collection", newCollectionPlayList)
router.get("/get-collection", getCollectionPlayList)
router.post("/watch-later-video", postWatchLaterVideo)
router.get("/watch-later-video", getWatchList)
router.put("/update-status", upDateStatusController)
router.get("/get-video-type", getVideoListByTypeController)
module.exports = router;
