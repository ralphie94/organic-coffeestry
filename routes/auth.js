const express = require("express");
const router = express.Router();

const { signup, signin, signout, requireSignin, accountActivation } = require("../controllers/auth");
const { userSignupValidator, userSigninValidator } = require("../validator/auth");
const { runValidation } = require("../validator/index");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

module.exports = router;