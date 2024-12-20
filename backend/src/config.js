import dotenv from 'dotenv';

dotenv.config(); 

export const config = {
  db: {
    URI: process.env.DB_URI || 'mongodb://localhost:27017/byteShop',
  },
  server: {
    port: process.env.PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  },
  email:{
    password: process.env.APP_PASSWORD_EMAIL,
  },
};


