import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/connectDb";
import { User } from "./user.model";

export const Member = sequelize.define('member', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    defaultCaseManager: {
        type: DataTypes.UUID
    },
    bulkCaseManager: {
        type: DataTypes.UUID
    },
    singleCaseManager: {
        type: DataTypes.UUID
    }
})
Member.hasMany(User, {
    foreignKey: 'memberId',
    as: 'userInfo1'
});

User.belongsTo(Member, {
    foreignKey: 'memberId',
    as: 'memberInfo1'
});