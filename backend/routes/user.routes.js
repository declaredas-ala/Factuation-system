const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
    "set-cookie"
  );
  next();
});

// Public routes
router.post("/register", userController.signupUser);
router.post("/login", userController.loginUser);

// Protected routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/me", userController.getCurrentUser);
router.get("/profile", userController.getCurrentUser); // New route for getting current user's profile
router.put("/profile", userController.updateCurrentUserProfile); // New route for updating current user's profile
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Logout route
router.post("/logout", userController.logoutUser);

module.exports = router;
