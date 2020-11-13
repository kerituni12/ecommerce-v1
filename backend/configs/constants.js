module.exports = {
  mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/ecomm",

  jwtSecret: process.env.JWT_SECRET || "abcdefghijklmnopqrstuvwxyz1234567890",
  jwtExpiresIn: 3600,

  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",

  mailConfigs: {
    admin: {
      name: "admin",
      email: "admin@admin.com",
    },
    confirmEmails: {
      from: "no-reply@test-app.com",
    },
  },
  mailchimpConfigs: {
    apiKey: process.env.MAICHIMP_APIKEY,
    listsId: process.env.MAILCHIMP_LISTID,
  },
};
