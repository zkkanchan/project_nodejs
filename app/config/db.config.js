const Sequelize = require('sequelize');
const env = require('./env.js');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port:env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//Models/tables
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.users =  require('../model/user.model.js')(sequelize, Sequelize);
db.aboutus= require('../model/aboutus.model.js')(sequelize, Sequelize);
db.golden= require('../model/golden.model.js')(sequelize, Sequelize);
db.habit= require('../model/habit.model.js')(sequelize, Sequelize);
module.exports = db;