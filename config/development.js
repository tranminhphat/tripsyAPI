module.exports = {
  PORT: 2004,
  MONGO_URI:
    "mongodb+srv://phattran:tripsy2021@tripsyapi.dsnvq.mongodb.net/tripsy?retryWrites=true&w=majority",
  CORS_WHITELIST: ["http://localhost:3000"],
  JWT_SECRET: "tripsy@2021",
  EMAIL_SECRET: "email_tripsy@2021",
  FORGOT_PASSWORD_SECRET: "forgot-password_tripsy@2021",
  GMAIL_USER: "a17522004@gmail.com",
  GMAIL_PASSWORD: "Nguvodoi123",
  cloudinary: {
    CLOUD_NAME: "tranminhphat",
    API_KEY: "738375363356871",
    API_SECRET: "i-z0KIg8CG-8-Ei8IBmzT-yHkcg",
  },
  STRIPE_SK_TEST:
    "sk_test_51IXjZvDcrQRGXIG6bRiF2kdXHW7FLUjXAQ8tjMSxuu6QIC8Izi1yxTcVI9MJk3kp45crg80hn8IqbfTreXcSMyLN0014iZUAnk",
  VONAGE_API_KEY: "E4jAjANPERRDiWaeOoo5H4KIH",
};
