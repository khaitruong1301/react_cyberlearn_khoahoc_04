import { GET_ALL_PROJECT } from "../constants/Cyberbugs/ProjectCyberBugsConstants";


const stateDefault = {
    projectList: [],
    arrProject: [] //Get allproject cho dropdown

}




export const ProjectCyberBugsReducer = (state = stateDefault,action) => {


    switch(action.type){

        case 'GET_LIST_PROJECT': {
                state.projectList = action.projectList;
                console.log("projectList",action.projectList)
                return {...state};
        }

        case GET_ALL_PROJECT : {
            // state.arrProject = action.arrProject;
            return {...state,arrProject:action.arrProject}
        }

        default: return {...state}
    }
}