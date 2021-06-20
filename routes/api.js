const router = require("express").Router();


const admin = require("../controllers/admin");
const user=require("../controllers/user");
const weather=require("../controllers/weather");

//admin's methods
router.post("/createAdmin", admin.createAdmin);
router.get("/login/admin", admin.loginAdmin);
router.delete("/deleteUser", admin.deleteUser);
router.put("/updateAdmin", admin.updateAdmin);
router.get("/getAllUsers", admin.getAllUsers);

//user's methods
router.post("/createUser", user.createUser);
router.get("/login/user", user.loginUser);
router.put("/updateUser", user.updateUser);
router.get("/getUserById/:id", user.getUserById);

//weather's methods
router.post("/createWeather/:city",weather.createWeather);
router.get("/getWeather",weather.getWeather);
router.get("/getWeathersByUserId/:id",weather.getWeathersByUserId);
router.delete("/deleteWeather/:id",weather.deleteWeather);

module.exports = router;