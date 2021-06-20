const { json } = require("body-parser");
const request=require("request");
const Weather=require("../models/weather");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const User = require("../models/user");
const apis=(city)=>{
    let options = {
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1080efd12bec08063a672244514f123`
    }
    const promise=new Promise((resolve,reject)=>{
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })
    return promise;
}

const createWeather=async(req,res)=>{
  console.log("createWeather");
  const city=req.params.city;
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decod=jwt.verify(token, process.env.SECRET);
   console.log(decod);
    const user=await User.findOne({name:decod.name,password:decod.password});
   console.log(user);
    const weather=JSON.parse(await apis(city));
   const w=new Weather({date:new Date(),city:city,temp:weather.main,wind:weather.wind,userId: user._id})
   const w2=await w.save();
   console.log(w2.userId);
   res.status(200).json({weather:w2})
  } catch (error) {
      res.status(400).json({err:error});
  }
}

const deleteWeather=async(req,res)=>{
  try {
      const weather=await Weather.findByIdAndDelete(req.params.id);
      const u=User.findByIdAndUpdate(weather.userId,{ $pull: { weathers:weather._id } }, { new: true });
      res.status(200).json({weather:weather});
  } catch (error) {
      res.status(400).json({err:error})
  }
}

const getWeathersByUserId=async(req,res)=>{
 try {
     const weather=await Weather.findOne({userId:req.params.id});
     res.status(200).json({weather:weather});
 } catch (error) {
    res.status(400).json({error:error});
 }
}

const getWeather=async(req,res)=>{
    try {
        const token = req.headers.authorization;
        const decod=jwt.verify(token, process.env.SECRET);
        console.log(decod);
        const user=await User.findOne({name:decod.name,password:decod.password});
        console.log(user);
        const weather=await Weather.find({userId:user._id});
        res.status(200).json({weather:weather});
    } catch (error) {
       res.status(400).json({error:error});
    }
}


module.exports={createWeather,deleteWeather,getWeather,getWeathersByUserId}