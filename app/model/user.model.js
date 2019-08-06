const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        Phone: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        dob: {
            type: Sequelize.DATEONLY,

        },
        user_type: {
            type: Sequelize.STRING
        },
        staus: {
            type: Sequelize.INTEGER
        }

    });

    return User;
}
