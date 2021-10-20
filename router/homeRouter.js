const route = require("express");

const { home, about, fetchRepos, addUser, getUser, getSingleUser, user } = require("../controller/homeController");
const { cacheMiddleware } = require("../middleware/cacheMiddleware");
const { getCacheUser } = require("../middleware/getCacheUserMiddleware");
const router = route.Router();

router.get("/", home);
router.get("/about", about);
router.get("/repos/:username",cacheMiddleware , fetchRepos)
router.post("/add_user", addUser);
router.get("/get_user", getUser)
router.get("/user/:id", getSingleUser)
router.post("/test", user)

module.exports = router;