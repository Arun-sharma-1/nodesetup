import { Member } from "./member.model";
import { User } from "./user.model";

export const associateModels = () => {
    Member.hasMany(User, {
        foreignKey: 'memberId',
        as: 'userInfo'
    });

    User.belongsTo(Member, {
        foreignKey: 'memberId',
        as: 'memberInfo'
    });
};