import {call, put,takeLatest} from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import {notifiFunction} from '../../../util/Notification/notificationCyberbugs'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import {GET_TASK_DETAIL_SAGA,GET_TASK_DETAIL,UPDATE_STATUS_TASK_SAGA} from '../../constants/Cyberbugs/TaskConstants'
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

//update task 

function * updateTaskStatusSaga (action) {

    const {taskUpdateStatus} = action;
console.log(action)
    try {

        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const {data,status} = yield call(()=> taskService.updateStatusTask(taskUpdateStatus));

        //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task 
        // console.log(data)
        if(status==STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_PROJECT_DETAIL',
                projectId:taskUpdateStatus.projectId
            })

            yield put({
                type:GET_TASK_DETAIL_SAGA,
                taskId:taskUpdateStatus.taskId
            })
        }



    }catch (err){
        console.log(err);
        console.log(err.response?.data);

    }
}

export function *theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA,updateTaskStatusSaga)
}