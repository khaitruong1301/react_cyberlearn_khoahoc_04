import { USLOGIN } from "../constants/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECT_ID } from "../constants/Cyberbugs/UserConstatnts";

const { USER_LOGIN } = require("../../util/constants/settingSystem");

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}




const stateDefault =  {
    userLogin : usLogin,
    userSearch: [],
    arrUser:[]//Array user cho thẻ select create task

}



export const UserLoginCyberBugsReducer = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }

        case 'GET_USER_SEARCH' :{
            state.userSearch = action.lstUserSearch;
            console.log('stateUser',state);
            return {...state}
        }
        case GET_USER_BY_PROJECT_ID: {
            return  {...state,arrUser:action.arrUser}
        }

        default : return {...state};
    }
}