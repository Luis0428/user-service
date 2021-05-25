import { IUserService } from "./interface";
import User from "../../models/User.model";
import { UserTo } from "../../to/UserTo";
import { UpdatedAt } from "sequelize-typescript";
import { Op } from "sequelize";
import Users from "../../models/User.model";
import { ParametersError } from "../../config/error";


/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async findAll(): Promise<any[]> {
        return User.findAll();
    },

    async create(user: UserTo):Promise<void>{
        let userModel: any = {...user}
        await User.create(userModel);
    },

    async Validate(user: UserTo): Promise<boolean>{
        let flag: boolean = true;
        const {name} = user;
        if(!name){
            flag = false;
        }
        return flag;
    },

    async update(id:number, user: UserTo): Promise<[number, User[]]>{
        return await User.update(user, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    },

    async deleteUser(id:number): Promise<number>{
        return await User.destroy({where: {
            id: {
                [Op.eq]: id
            }
        }
    });
    },

    async validateDelete(user:any):Promise<void>{
        const {id} = user;
        if(!id){
            throw new ParametersError("id required")
        }
        if(typeof id !== 'number'){
            throw new ParametersError("id is number");
        }
    }
}

export default UserService;