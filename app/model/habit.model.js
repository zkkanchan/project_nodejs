const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	const Habit = sequelize.define('habit', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        habitname: {
            type: Sequelize.STRING
        },
        dese: {
            type: Sequelize.STRING
        },
        popular: {
            type: Sequelize.INTEGER
        }
	});
	
	return Habit;
}