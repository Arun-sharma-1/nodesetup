import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database/connectDb";
interface StaffUserAttributes {
    id: string;
    staffPin: string;
}
interface StaffUserCreationAttributes extends Optional<StaffUserAttributes, 'staffPin'> { }

interface StaffUserInstance extends Model<StaffUserAttributes, StaffUserCreationAttributes>, StaffUserAttributes { }
export const StaffUser = sequelize.define<StaffUserInstance>('staff-user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    staffPin: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})