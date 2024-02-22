const Reg = require('../models/reg');


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body.regRecord
        const userCheck = await Reg.findOne({ email: email })
        if (userCheck == null) {
            const record = new Reg({
                username: username,
                email: email,
                password: password
            })
            record.save()
            res.status(201).json({
                status: 201,
                message: `User Name ${username} is Successfully Added`
            })
        } else {
            res.status(400).json({
                message: `User Name ${username} is Already Registered`
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

exports.loginCheck = async (req, res) => {
    try {
        const { email, password } = req.body.loginRecord
        const record = await Reg.findOne({ email: email })
        if (record !== null) {
            if (record.password === password) {
                res.status(200).json({
                    status: 200,
                    apiData: record.username
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Wrong Credntails"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Wrong Credntails"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }

}