import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {history} from '../../../util/history';
function* createProjectSaga(action) {

    console.log('actionCreateProject',action)
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            history.push('/projectmanagement');
        }


    } catch (err) {
        console.log(err);
    }
   
    yield put({
        type: HIDE_LOADING
    })
}





export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}




//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function *getListProjectSaga(action) { 

    try {
        const {data,status} = yield call( () => cyberbugsService.getListProject());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}