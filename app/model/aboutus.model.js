const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	const Aboutus = sequelize.define('aboutus', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fulldesc: {
            type: Sequelize.STRING
        },
        shortsesc: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        tagline: {
            type: Sequelize.STRING
        }  
	});
	
	return Aboutus;
}