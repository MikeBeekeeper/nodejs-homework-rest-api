const { SMTP_USER, WEB_HOST } = require("../constants/env")
const { transport } = require(".")
const fs = require("node:fs/promises")
const path = require("node:path")
const Handlebars = require("handlebars")
const {User} = require("../models/user")

const sendVerifyLink = async (email) => {
    try {
        const user = await User.findOne().where('email').equals(email);
        const { verificationToken } = user

        const file = (await fs.readFile(path.join(__dirname, "verificationEmailLetter.html"))).toString()
        const template = Handlebars.compile(file)
        const html = template({
            verificationLink: `${WEB_HOST}/users/verify/${verificationToken}`,
        })

         transport.sendMail({
            to: email,
            from: SMTP_USER,
            html,
         })

    } catch (error) {
        throw error
    }

}

module.exports = sendVerifyLink