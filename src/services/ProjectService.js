import { baseService } from "./baseService";

export class ProjectService extends baseService {

    constructor(){
        super();
    }

    deleteProject = (id) => {
        
       return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }

}


export const projectService = new ProjectService();
