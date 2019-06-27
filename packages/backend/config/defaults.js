module.exports = {
  server: {
    port: 8080,
  },
  db: {
    connectionString: 'mongodb://127.0.0.1:27017/mt',
  },
  auth: {
    secret: 'jwt-secret',
    expiresIn: 2 * 3600,
  },
};
