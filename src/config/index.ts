import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_saltRounds:process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.JWT_SECRET,
    expire_access_in: process.env.JWT_EXPIRES_IN,
  },
}
