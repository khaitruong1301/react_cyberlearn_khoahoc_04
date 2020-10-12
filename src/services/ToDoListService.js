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

    addTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/addTask`,
            method: 'POST',
            data: {
                taskName:taskName
            }
        })
    }

}

export const toDoListService = new ToDoListService();

