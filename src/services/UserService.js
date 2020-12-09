import { baseService } from "./baseService";

export class UserService extends baseService {

    constructor(){
        super();
    }

    getUser = (keyWord) => {
        
       return this.get(`Users/getUser?keyword=${keyWord}`);
    }


    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject);
    }


}


export const userService = new UserService();
