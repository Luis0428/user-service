import { use } from "chai";
import { userInfo } from "os";
import { NotFoundError, ParametersError } from "../../config/error";
import { UserService } from "../../services";
import { UserTo } from "../../to/UserTo";
import { IUserFacade } from "./interface";


/**
 * @export
 * @implements {IUserModelService}
 */
const UserFacade: IUserFacade = {
    /**
     * @returns {Promise < any[] >}
     * @memberof UserFacade
     */
    async findAll(): Promise<any[]> {

        let User = await UserService.findAll();
        let UserMap: any[] =[];
        User.forEach(v =>{
            UserMap.push({id: v.id, name: v.name, email:v.email});
        });
        return UserMap;
    },

    /**
     * @returns {Promise < void >}
     * @memberof UserFacade
     */
     async create(user: UserTo): Promise<void> {

        if(!await UserService.Validate(user)){
            throw new ParametersError('name is required');
        }
        
        await UserService.create(user);
    },

    /**
     * @returns {Promise < number >}
     * @memberof UserFacade
     */
     async update(id:number, user: UserTo): Promise<number> {

        if(!await UserService.Validate(user)){
            throw new ParametersError('name is required');
        }
        
        let response = await UserService.update(id, user);
        if(response[0] === 0){
            throw new NotFoundError('User not found');
        }
        return response[0];
    },

    /**
     * @returns {Promise < number >}
     * @memberof UserFacade
     */
     async deleteUser(user:any): Promise<void> {
        const id= user.id;
        let response = await UserService.deleteUser(user.id);
        console.log(response)
        if(response === 1){
            throw new NotFoundError("User Not Found")
        }
        
    }
}

export default UserFacade;