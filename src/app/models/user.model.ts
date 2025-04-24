import {
    DataTypes,
    Model,
    Optional
} from "sequelize";
import { sequelize } from "../config/database/connectDb";
import { Member } from "./member.model";

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    memberId?: string;
    staffUserId?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'memberId' | 'staffUserId' | 'lastName'> { }

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes { }

export const User = sequelize.define<UserInstance>('user',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        memberId: {
            type: DataTypes.UUID
        },
        staffUserId: {
            type: DataTypes.UUID
        }
    }
);

// User.belongsTo(Member, {
//     foreignKey: 'memberId',
//     as: 'memberInfo'
// })

// User.hasOne(Member, {
//     foreignKey:'singleCaseManager'
// })