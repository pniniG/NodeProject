
const mongoose = require('mongoose')
const User=require("../models/user");

const weatherSchema = mongoose.Schema({
    date:
    {
        type: Date,
       
    },
    city:
     {
        type: String,
      
     },
    temp:
      {

      },
    wind:{

    },
    userId:
        { type: mongoose.Types.ObjectId, ref: 'User' }
})
weatherSchema.post('save', async function (next) {
  try {
      console.log("post " + this);   
      const user =await User.findByIdAndUpdate(this.userId, { $push: { weathers: this._id } }, { new: true })
      console.log("user"+user);
      next;
  } catch (error) {
      console.log("err");
  }
})
module.exports = mongoose.model('Weather', weatherSchema)

