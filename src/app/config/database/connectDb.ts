import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('my_db', 'me', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

const connectAndSyncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default connectAndSyncDB;
