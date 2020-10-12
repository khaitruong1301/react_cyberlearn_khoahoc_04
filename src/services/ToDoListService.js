import Axios from "axios";
import { DOMAIN } from "../util/constants/settingSystem"

export class ToDoListService {
    constructor(){

    }

    getTaskApi = () => {
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

}

export const toDoListService = new ToDoListService();

