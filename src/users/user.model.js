
import {Model, DataTypes} from 'sequelize';

export class UserModel extends Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement:true
                },
                first_name: {
                    type: DataTypes.STRING,
                },
                second_name: {
                    type: DataTypes.STRING
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING
                },
                gender: {
                    type: DataTypes.STRING,
                    validate: {
                        isIn: [['male', 'female']]
                    }
                },
                photo: {
                    type: DataTypes.STRING
                },
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                }
            },{
                sequelize,
                tableName: 'users',
                modelName: 'User'   
            }
        )
    }
}
// const user = (sequelize, Sequelize) => {/
//     const UserModel = sequelize.define(
//         'users',
//         {
//             id: {
//                 type: Sequelize.INTEGER,
//                 primaryKey: true,
//                 autoincrement:true
//             },
//             first_name: {
//                 type: Sequelize.STRING,
//             },
//             second_name: {
//                 type: Sequelize.STRING
//             },
//             email: {
//                 type: Sequelize.STRING,
//                 unique: true,
//             },
//             password: {
//                 type: Sequelize.STRING
//             },
//             gender: {
//                 type: Sequelize.STRING,
//                 validate: {
//                     isIn: [['male', 'female']]
//                 }
//             },
//             photo: {
//                 type: Sequelize.STRING
//             },
//             createdAt: {
//                 type: Sequelize.DATE,
//                 defaultValue: Sequelize.NOW,
//             }
//         }
//     )
//     return UserModel;
// }
// export {user};
