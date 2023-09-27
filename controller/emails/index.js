const emailModel = require("../../model/email")
const { Op } = require("sequelize");
const filesModel = require("../../model/email/file");

exports.newEmailController = async (req, res) => {
    try {

        const PhotoPath = []
        if (Array.isArray(req.files.images) && req.files.images.length > 0) {
            req.files.images.map((item) => PhotoPath.push(item))
        }


        const result = await emailModel.create(req.body)
        if (PhotoPath.length > 0) {
            const files = await PhotoPath.map(item => {
                return {
                    emailId: result.emailId,
                    filesPath: item.path,
                    mimetype: item.mimetype,
                    orgName: item.originalname,
                    size: item.size,
                }
            })
            console.log(files);
            await filesModel.bulkCreate(files)

        }

        return res.json({
            code: "1111",
            message: "e-mail send successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            code: "0000",
            message: "Internal server error"
        })

    }
}
exports.emailDetailsController = async (req, res) => {
    try {

        const result = await emailModel.findOne({
            where: {
                emailId: req.params.id
            }
        })
        if (result.status == "new") {
            await emailModel.update({ status: "read", seen: true }, {
                where: {
                    emailId: req.params.id
                }
            })
        }

        const file = await filesModel.findAll({
            where: {
                emailId: req.params.id
            }
        })

        return res.json({
            code: "1111",
            message: "e-mail details",
            email: result,
            file
        })
    } catch (error) {
        console.log(error);
        return res.json({
            code: "0000",
            message: "Internal server error"
        })

    }
}
exports.getListEmails = async (req, res) => {
    try {
        const email = req.query.email;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const excludedFields = ['updatedAt'];
        const list = await emailModel.findAndCountAll({
            limit, offset, order: [['createdAt', 'DESC']], attributes: {
                exclude: excludedFields,
            },
            where: {
                status: req.query.status,
                [Op.or]: [{ tos: email }, { ccc: email }]
            }
        })
        const totalPages = Math.ceil(list.count / limit);
        return res.json({
            code: "1111",
            message: "get emails list successfully",
            data: {
                currentPage: page,
                totalPages,
                emails: list.rows
            }
        })
    } catch (error) {
        console.log("Internal server error", error);
    }
}

exports.updateStatusEmailController = async (req, res) => {
    try {
        console.log(req.body);
        const { status, emailIdList } = req.body
        console.log(status, emailIdList);
        await emailModel.update({ status, seen: true }, {
            where: {
                emailId: emailIdList
            }
        })
        return res.json({
            code: "1111",
            message: "e-mail updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            code: "0000",
            message: "Internal server error"
        })

    }
}