
const Admin = require("../models/admin");
const jwt=require("jsonwebtoken");
const User = require("../models/user");
const nodemailer=require("nodemailer");
const mongoose=require("mongoose");
function sendmail(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'p0556700724@gmail.com',
            pass: 'PBHBHTHAH3'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'p0556700724@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'you  saved successfuly!'
    };
    const promise1 = new Promise((resolove, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            } else {
                resolove(info)
            }
        })
    }
    );
    return promise1
}
const createUser=async(req,res)=>{

try {
    console.log("createUser");
    const user = new User(req.body);
    console.log(user);
    user.admin = req.params.admin;
    console.log(user);
    const u = await user.save();
    console.log(u);
    const token = req.headers.authorization;
    const decod=jwt.verify(token, process.env.SECRET);
    console.log(decod);
    const admin =await Admin.findOneAndUpdate({name:decod.name,password:decod.password}, { $push: { users: u._id } }, { new: true })
    const mail=await sendmail(u.email);
    res.status(200).json({ admin: admin, user: u });
    
} catch (error) {
    res.status(400).json({ error: error })

    
}
}
const loginUser=async(req,res)=>{
    try {
        console.log("hhhh");
        const u = await User.find({ name: req.body.name, password: req.body.password });
        const token = jwt.sign(req.body, process.env.SECRET)
        res.status(200).json({ token: token})

    } catch (error) {
        console.log("err:" + error);
        res.status(500).json({err:error});
    }
}

const updateUser=async(req,res)=>{
  try {

    const token = req.headers.authorization;
    const decod=jwt.verify(token, process.env.SECRET);
    console.log(decod);
    const user=await User.findOneAndUpdate({name:decod.name,password:decod.password},req.body,{new:true});
    res.status(200).json({user:user});
  } catch (error) {
    res.status(400).json({err:error});

  }
}

const getUserById=async(req,res)=>{
  try {
      const user=await User.findById(req.params.id);
      res.status(200).json({user:user});
  } catch (error) {
      res.status(400).json({err:error});
  }
}

module.exports={loginUser,createUser,updateUser,getUserById};
