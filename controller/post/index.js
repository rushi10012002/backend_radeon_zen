const postModel = require("../../model/post")
const playListModel = require("../../model/post/playList")
const watchModel = require("../../model/post/watchLater")
const channelModel = require("../../model/channel")

const collectionModel = require("../../model/post/playList.collection")
const { Op } = require("sequelize")
exports.updatePostController = async (req, res) => {
    try {
        console.log("updating post");
        console.log(req.body);


        await postModel.update({
            title: req.body.title,
            subTitle: req.body.subTitle,
            coverPath: req.body.coverPath == "" ? "" : req.files?.coverPath[0]?.path,
            description: req.body.description,
        }, {
            where: {
                postId: req.body.postId
            }
        })
        return res.json({
            code: "1111",
            message: "Post updated successfully",
        })


    } catch (error) {
        console.log(error);
    }
}
exports.createPostController = async (req, res) => {
    try {
        console.log("creating post");
        console.log(req.body);
        console.log(req.files);
        const newPost = await postModel.create({
            title: req.body.title,
            subTitle: req.body.subTitle,
            type: req.body.type,
            channelId: req.body.channelId,
            coverPath: "",
            videoPath: req.files.video[0].path,
            description: req.body.description,
            status: req.body.status

        })
        return res.json({
            code: "1111",
            message: "video is uploaded successfully",
            post: newPost
        })


    } catch (error) {
        console.log(error);
    }
}
exports.getVideoListController = async (req, res) => {
    try {
        const header = {
            filter: req.query.filter, searchString: req.query.searchString
        }
        console.log("-----------------------------------------");
        console.log(header);
        if (header.filter) {
            console.log("filetr");
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const excludedFields = ['updatedAt'];
            const list = await postModel.findAndCountAll({
                limit, offset, order: [['createdAt', 'DESC']], attributes: {
                    exclude: excludedFields,
                },
                where: {
                    // status: 1,
                    channelId: req.query.channelId,
                    [Op.or]: [{ title: { [Op.like]: `%${header.searchString}%` } }, { subTitle: { [Op.like]: `%${header.searchString}%` } }, { type: { [Op.like]: `%${header.searchString}%` } }]
                }
            })
            const totalPages = Math.ceil(list.count / limit);
            const totalVideos = Math.ceil(list.count);
            return res.json({
                code: "1111",
                message: "get video list successfully",
                data: {
                    currentPage: page,
                    totalPages,

                    videos: {
                        data: list.rows, totalVideos
                    }
                }
            })
        } else {
            console.log("not filter");
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const excludedFields = ['updatedAt'];
            const list = await postModel.findAndCountAll({
                limit, offset, order: [['createdAt', 'DESC']], attributes: {
                    exclude: excludedFields,
                },
                where: {
                    // status: 1,
                    channelId: req.query.channelId
                }
            })
            const totalPages = Math.ceil(list.count / limit);
            const totalVideos = Math.ceil(list.count);
            return res.json({
                code: "1111",
                message: "get video list successfully",
                data: {
                    currentPage: page,
                    totalPages,

                    videos: {
                        data: list.rows, totalVideos
                    }
                }
            })
        }

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.getVideoListByTypeController = async (req, res) => {
    try {

        const type = req.query.type
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        if (type != undefined && type != "" && page != undefined && page != "" && limit != "" && limit != 0) {
            const offset = (page - 1) * limit;
            const excludedFields = ['updatedAt'];
            const list = await postModel.findAndCountAll({
                limit, offset, order: [['createdAt', 'DESC']], attributes: {
                    exclude: excludedFields,
                },
                where: {
                    status: 1,
                    [Op.or]: [{ title: { [Op.like]: `%${type}%` } }, { subTitle: { [Op.like]: `%${type}%` } }, { type: { [Op.like]: `%${type}%` } }]
                }
            })
            const totalPages = Math.ceil(list.count / limit);
            const totalVideos = Math.ceil(list.count);
            return res.json({
                code: "1111",
                message: "get video list successfully",
                data: {
                    currentPage: page,
                    totalPages,

                    videos: {
                        data: list.rows, totalVideos
                    }
                }
            })
        } else {
            throw new Error("invalid request query please check !")
        }

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.upDateStatusController = async (req, res) => {
    try {
        await postModel.update({
            status: req.body.status
        }, {
            where: {
                postId: req.body.postId
            }
        })

        return res.json({
            code: "1111",
            message: "status updated successfully"
        })
    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.postWatchLaterVideo = async (req, res) => {
    console.log(req.body);
    try {
        const exist = await watchModel.findOne({
            where: {
                postId: req.body.postId
            }
        })
        if (exist) {
            return res.status(200).json({
                code: "0000",
                message: "this post is already exist"
            })

        }
        await watchModel.create(req.body)
        return res.status(200).json({
            code: "1111",
            message: "video added in watch list successfully"
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.getWatchList = async (req, res) => {
    try {
        const videoList = await watchModel.findAll({
            where: {
                userId: req.query.userId
            }
        })
        const postIdArray = await videoList.map(item => item.postId)
        const video = await postModel.findAll({
            where: {
                postId: postIdArray
            }
        })
        return res.status(200).json({
            code: "1111",
            message: "get watch video list",
            video,
            postIdArray
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.newPlayList = async (req, res) => {
    try {
        const existPlayList = await playListModel.findOne({
            where: {
                name: req.body.name,
                userId: req.body.userId
            }
        })
        if (existPlayList) {
            return res.status(200).json({
                code: "0000",
                message: "playList is already exist",
                playlist: existPlayList
            })
        }

        const playList = await playListModel.create(req.body)
        return res.status(200).json({
            code: "1111",
            message: "playList created successfully",
            playList
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.getPlayList = async (req, res) => {
    try {

        const playList = await playListModel.findAll({
            where: {
                userId: req.query.userId
            }
        })
        return res.status(200).json({
            code: "1111",
            message: "get playList successfully",
            playList
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.getCollectionPlayList = async (req, res) => {
    try {

        const playList = await collectionModel.findAll({
            where: {
                playListId: req.query.playListId
            }
        })
        if (playList) {
            const newArray = await playList.map(item => item.postId);
            const videos = await postModel.findAll({
                where: {
                    postId: newArray
                }
            })
            return res.status(200).json({
                code: "1111",
                message: "get playList successfully",
                videos
            })
        }
        return res.status(200).json({
            code: "1111",
            message: "get playList successfully",
            videos: []
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}

exports.newCollectionPlayList = async (req, res) => {
    try {
        const existPlayList = await collectionModel.findOne({
            where: {
                [Op.and]: [{ postId: req.body.postId }, { playListId: req.body.playListId }]
            }
        })
        if (existPlayList) {
            return res.status(200).json({
                code: "0000",
                message: "video is already exist in selected playlist"
            })
        }

        await collectionModel.create(req.body)
        return res.status(200).json({
            code: "1111",
            message: "video is added in playList successfully"
        })

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}
exports.getVideoListPublicController = async (req, res) => {
    try {
        const header = {
            filter: req.query.filter, searchString: req.query.searchString
        }
        const channelDetails = async (id) => {
            return await channelModel.findAll({
                where: {
                    channelId: id
                }
            })
        }
        console.log("-----------------------------------------");
        console.log(header);
        if (header.filter) {
            console.log("filetr");
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9;
            const offset = (page - 1) * limit;
            const excludedFields = ['updatedAt'];
            const list = await postModel.findAndCountAll({
                limit, offset, order: [['createdAt', 'DESC']], attributes: {
                    exclude: excludedFields,
                },
                where: {
                    status: 1,
                    [Op.or]: [{ title: { [Op.like]: `%${header.searchString}%` } }, { subTitle: { [Op.like]: `%${header.searchString}%` } }, { type: { [Op.like]: `%${header.searchString}%` } }]
                }
            })
            const totalPages = Math.ceil(list.count / limit);
            const totalVideos = Math.ceil(list.count);
            const channelId = await [... new Set(list.rows.map(item => item.channelId))]
            const channelsList = await channelDetails(channelId)
            return res.json({
                code: "1111",
                message: "get video list successfully",
                data: {
                    currentPage: page,
                    totalPages,
                    channelsList,
                    videos: {
                        data: list.rows, totalVideos
                    }
                }
            })
        } else {
            console.log("not filter");
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9;
            const offset = (page - 1) * limit;
            const excludedFields = ['updatedAt'];
            const list = await postModel.findAndCountAll({
                limit, offset, order: [['createdAt', 'DESC']], attributes: {

                    exclude: excludedFields,
                },
                where: {
                    status: 1,
                }
            })

            const totalPages = Math.ceil(list.count / limit);
            const totalVideos = Math.ceil(list.count);
            const channelId = await [... new Set(list.rows.map(item => item.channelId))]
            const channelsList = await channelDetails(channelId)
            return res.json({
                code: "1111",
                message: "get video list successfully",
                channelDetails: xx,
                data: {
                    currentPage: page,
                    totalPages,
                    channelsList,
                    videos: {
                        data: list.rows, totalVideos
                    }
                }
            })
        }

    } catch (error) {
        res.status(404).json({
            code: "0000",
            message: error.message,
            stack: error.stack
        })
    }
}