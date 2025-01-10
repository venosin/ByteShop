import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI || "mongodb://localhost:27017/byteShop",
  },
  server: {
    port: process.env.PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  },
  email: {
    password: process.env.APP_PASSWORD_EMAIL,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  paypal: {
    clientId:
      process.env.PAYPAL_API_CLIENT_ID ||
      "AZ0-pDM6302pnbZRtN2YNlHYgoelY2vINJqjtizAL7uDjHSmH9rOzsUbtUoIB_YbEbe-umnL7q5ucUyx",
    clientSecret:
      process.env.PAYPAL_API_SECRET ||
      "EDZPnvw-Eq0DslC2ld8ugFf96fheV-Il5bXHJnfMGEzRnl8WKcD7UIoLygJEeuBaZWV3rL63YmQUaHyf",
    PAYPAL_API: "https://api-m.sandbox.paypal.com/",
  },
};
