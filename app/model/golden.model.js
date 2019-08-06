const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	const Golden = sequelize.define('golden', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fulldesc: {
            type: Sequelize.STRING
        },
        icon: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        }
	});
	
	return Golden;
}