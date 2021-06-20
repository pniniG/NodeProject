const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Weather = require("../models/weather");
const { findByIdAndUpdate } = require("../models/admin");



const createAdmin = async (req, res) => {
    const admin = new Admin(req.body)
    try {

        const a = await admin.save();
        res.status(200).json({ admin: a })
    } catch (error) {
        console.log("err:" + error);
        res.status(500);
    }

}
const loginAdmin = async (req, res) => {

    try {
        const a = await Admin.find({ name: req.body.name, password: req.body.password });
        const token = jwt.sign( req.body, process.env.SECRET);
        res.status(200).json({a:a, token: token })
    } catch (error) {
        console.log("err:" + error);
        res.status(500);
    }
}
const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decod=jwt.verify(token, process.env.SECRET);
        const u=await User.findByIdAndDelete(req.query.userId);
        console.log(u);
        const a=await Admin.findOneAndUpdate({name:decod.name,password:decod.password},{ $pull: { users:u._id } }, { new: true });
        console.log(a);
        res.status(200).json({ admin:a,user: u})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const updateAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decod=jwt.verify(token, process.env.SECRET);
        const a = await Admin.findOneAndUpdate({name:decod.name,password:decod.password}, req.body, { new: true });
        res.status(200).json({ admin: a });
    } catch (error) {
        res.status(400).json({ err: error });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decod=jwt.verify(token, process.env.SECRET);
        const a = await Admin.findOne({name:decod.name,password:decod.password}).populate({ path: "users" });
        res.status(200).json(a);
    } catch (error) {
        res.status(400).json({ err: error });
    }
}
module.exports = { createAdmin, loginAdmin, deleteUser, updateAdmin, getAllUsers }