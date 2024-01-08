const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { HttpError, ctrlWrapper, transport } = require("../helpers");
const { User } = require("../models/user")
const { SECRET_KEY } = require("../constants/env")
const gravatar = require("gravatar")
const path = require("path")
const fs = require("fs/promises")
const Jimp = require("jimp")
const nanoid = require("nanoid");
const { sendVerifyLink } = require("../middlewares");
const { SMTP_USER } = require("../constants/env")

const avatarsDir = path.join(__dirname,"../", "public", "avatars")


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid()

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    sendVerifyLink(email)
    
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError(401, "Not verified")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await User.findByIdAndUpdate(user._id, {token})
    
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user
    
    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: "" })
    
    res.json({
        message: "Logout success"
    })
}

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw HttpError(400, "File is required")
    }
    const {_id} = req.user
    const { path: tempUpload, originalname } = req.file
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, filename)

    Jimp.read(tempUpload, (err, ava) => {
        if (err) throw err
        ava.resize(250, 250)
    })

    fs.rename(tempUpload, resultUpload)   
    const avatarURL = path.join("avatars", filename)
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.json({
        avatarURL
    })

}

const examByVerificationToken = async (req, res) => {
    const { verificationToken } = req.params

    const user = await User.findOne().where('verificationToken').equals(verificationToken)
    if (!user) {
        throw HttpError(404, "Not found")
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const { _id } = user
    await User.findByIdAndUpdate(_id, {verify: true})
    
    res.json({
        message: 'Verification successful',
    })
}

const reapeatingExam = async (req, res) => {

    const { email } = req.body
    if (!email) {
        throw HttpError(400, "missing required field email")
    }

    const user = await User.findOne().where('email').equals(email)
    if (!user) {
        throw HttpError(404, "Not found")
    }

    const {_id, verify } = user

    if (verify) {
        throw HttpError (400, "Verification has already been passed")    
    }

    sendVerifyLink(email)

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    examByVerificationToken: ctrlWrapper(examByVerificationToken),
    reapeatingExam: ctrlWrapper(reapeatingExam),
}