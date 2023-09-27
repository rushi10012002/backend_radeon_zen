const userModel = require("../../model/users")

exports.newUserController = async (req, res) => {
    try {
        const exist = await userModel.findOne({
            where: {
                sub: req.body.sub
            }
        })
        if (exist) {
            return res.json({
                user: exist,
                code: "1111",
                message: "user is exist"
            })
        }
        const newUser = await userModel.create(req.body)
        return res.json({
            user: newUser,
            code: "1111",
            message: "user is created successfully"
        })
    } catch (error) {
        console.log(error);
    }
}