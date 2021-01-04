import {call, put,takeLatest} from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import {notifiFunction} from '../../../util/Notification/notificationCyberbugs'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import {GET_TASK_DETAIL_SAGA,GET_TASK_DETAIL} from '../../constants/Cyberbugs/TaskConstants'
function* createTaskSaga (action) { 

    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const {data,status} = yield call(()=> taskService.createTask(action.taskObject));

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

        }
        yield put({
            type:'CLOSE_DRAWER'
        })
        notifiFunction('success','Create task successfully !');
    }
    catch(err) {
        console.log(err.response.data)
    }
    
    yield put({
        type: HIDE_LOADING
    })
}


export function * theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA',createTaskSaga);
}




function * getTaskDetailSaga(action) {
    
    const {taskId} = action;

    try{
        const {data,status} = yield call(()=>taskService.getTaskDetail(taskId));

        yield put({
            type:GET_TASK_DETAIL,
            taskDetailModal:data.content
        })

    }catch(err) {

        console.log(err);
        console.log(err.response?.data);

    }


}



export function* theoDoiGetTaskDetailSaga(action) {

    yield takeLatest(GET_TASK_DETAIL_SAGA,getTaskDetailSaga )

}