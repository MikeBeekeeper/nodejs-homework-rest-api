const { HttpError } = require("../helpers")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = require("../constants/env")
const {User} = require("../models/user")

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log(SECRET_KEY)
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"))
    }

    try {      
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)

        if (!user || !user.token || user.token !== token) {
            next(HttpError(401, "Not authorized"))
        }
        req.user = user;
        next()
    } catch {
        next(HttpError(401, "Not authorized"))
    }

}

module.exports = authenticate