const { default: Axios } = require("axios")
const { DOMAIN_CYBERBUG, TOKEN } = require("../util/constants/settingSystem")

export const cyberbugsService = { 
    signinCyberBugs: (userLogin) => {
       return Axios({
            url:`${DOMAIN_CYBERBUG}/users/signin`,
            method:'POST',
            data: userLogin
        }) 
    },
    getAllProjectCategory: () => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET'
        })
    },
    createProject: (newProject) => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Project/createProject`,
            method:'POST',
            data:newProject
        })
    },
    createProjectAuthorization : (newProject) => {
        console.log(localStorage.getItem(TOKEN))
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method:'POST',
            data:newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT 
        })
    },
    getListProject: () => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    },
    updateProject: (projectUpdate) => { 
        return Axios({
            url:`${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method:'PUT',
            data:projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}



