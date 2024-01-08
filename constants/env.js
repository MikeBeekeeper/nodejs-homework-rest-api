const dotenv = require('dotenv')

dotenv.config()

const {
    DB_MONGO_HOST,
    DB_MONGO_USER,
    DB_MONGO_PASSWORD,
    DB_MONGO_DATABASE,
    DB_MONGO_PORT,
    SECRET_KEY,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
} = process.env

if (!DB_MONGO_HOST) {
    console.log('DB_MONGO_HOST is not set')
    process.exit(1)
}

if (!DB_MONGO_USER) {
    console.log('DB_MONGO_USER is not set')
    process.exit(1)
}

if (!DB_MONGO_PASSWORD) {
    console.log('DB_MONGO_PASSWORD is not set')
    process.exit(1)
}

if (!DB_MONGO_DATABASE) {
    console.log('DB_MONGO_DATABASE is not set')
    process.exit(1)
}

if (!DB_MONGO_PORT) {
    console.log('DB_MONGO_PORT is not set')
    process.exit(1)
}

if (!SMTP_HOST) {
    console.log('SMTP_HOST is not set')
    process.exit(1)
}

if (!SMTP_PORT) {
    console.log('SMTP_PORT is not set')
    process.exit(1)
}

if (!SMTP_USER) {
    console.log('SMTP_USER is not set')
    process.exit(1)
}

if (!SMTP_PASSWORD) {
    console.log('SMTP_PASSWORD is not set')
    process.exit(1)
}

module.exports = {
    DB_MONGO_HOST,
    DB_MONGO_USER,
    DB_MONGO_PASSWORD,
    DB_MONGO_DATABASE,
    DB_MONGO_PORT,
    SECRET_KEY,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
}