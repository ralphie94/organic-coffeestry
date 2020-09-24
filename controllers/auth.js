const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '48hr' });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <p>To finish creating your organic coffeestry account, confirm your email address by clicking this link:</p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
                });
            })
            .catch(err => {
                console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                });
            });
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please register."
            });
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("t", token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role }});
    });
};

exports.accountActivation = (req, res) => {
    const { token } = req.body
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if(err) {
                console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
                return res.status(401).json({
                    error: "Expired link. Signup again."
                });
            }

            const {name, email, password} = jwt.decode(token)

            const user = new User({name, email, password})

            user.save((err, user) => {
                if(err) {
                    console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
                    return res.status(401).json({
                        error: "Error saving user in database. Try signing up again."
                    });
                }
                return res.json({
                    message: "Signup success. Please signin."
                });
            });
        });
    } else {
        return res.json({
            message: "Something went wrong. Please try again."
        });
    }
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout successful" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  });

  exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin only! Access denied"
        });
    }
    next();
};

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
            expiresIn: '10m'
        });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password Reset link`,
            html: `
                <p>Please use the following link to reset your password:</p>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            `
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            } else {
                sgMail
                    .send(emailData)
                    .then(sent => {
                        console.log('SIGNUP EMAIL SENT', sent)
                        return res.json({
                            message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
                        });
                    })
                    .catch(err => {
                        console.log('SIGNUP EMAIL SENT ERROR', err)
                        return res.json({
                            message: err.message
                        });
                    });
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: 'Expired link. Try again.'
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error resetting user password.'
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password.`
                    });
                });
            });
        });
    }
};