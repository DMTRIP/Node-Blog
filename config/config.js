module.exports = {
  app:{
    port: parseInt(process.env.DEV_APP_PORT) || 6000,
  },

  db: {
    mlab:{
      userName: 'Bot',
      password: 'Bot228',
      dbName: 'node-blog',
    },
  },

  jwtSecret: 'ASicretStringForJWT',

};