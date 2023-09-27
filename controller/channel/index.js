const channelModel = require("../../model/channel")

exports.createAndCheckChannelController = async (req, res) => {
    try {
        if (req.body.check == "true") {
            console.log("check channel");
            const existChannel = await channelModel.findOne({
                where: {
                    userId: req.body.userId
                }
            })
            if (existChannel) {
                return res.json({
                    code: "1111",
                    message: "channel is exist by this user",
                    channel: existChannel
                })
            }
            return res.json({
                code: "0000",
                message: "channel is not exist by this user",
                channel: null
            })
        } else {
            // const PhotoPath = []
            // if (Array.isArray(req.files.images) && req.files.images.length > 0) {
            //     req.files.images.map((item) => PhotoPath.push(item))
            // }
            console.log("creating channel");
            console.log(req.body);
            console.log();
            const newChannel = await channelModel.create({
                name: req.body.name,
                bio: req.body.bio,
                type: req.body.type,
                userId: req.body.userId,
                profilePath: req.files.profilePath[0].path

            })
            return res.json({
                code: "1111",
                message: "channel is created",
                channel: newChannel
            })
        }


    } catch (error) {
        console.log(error);
    }
}