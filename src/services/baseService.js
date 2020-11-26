import Axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"

export class baseService {

    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN_CYBERBUG}/${url}`,
            method:'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}