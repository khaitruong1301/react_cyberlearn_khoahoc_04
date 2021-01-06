import { call, put, select, takeLatest } from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { HANDLE_CHANGE_POST_API_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA, CHANGE_TASK_MODAL, CHANGE_ASSIGNESS, REMOVE_USER_ASSIGN } from '../../constants/Cyberbugs/TaskConstants'
function* createTaskSaga(action) {

    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const { data, status } = yield call(() => taskService.createTask(action.taskObject));

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

        }
        yield put({
            type: 'CLOSE_DRAWER'
        })
        notifiFunction('success', 'Create task successfully !');
    }
    catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);
}




function* getTaskDetailSaga(action) {

    const { taskId } = action;

    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(taskId));

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })

    } catch (err) {

        console.log(err);
        console.log(err.response?.data);

    }


}



export function* theoDoiGetTaskDetailSaga(action) {

    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)

}

//update task 

function* updateTaskStatusSaga(action) {

    const { taskUpdateStatus } = action;
    console.log(action)
    try {

        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const { data, status } = yield call(() => taskService.updateStatusTask(taskUpdateStatus));

        //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task 
        // console.log(data)
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateStatus.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }



    } catch (err) {
        console.log(err);
        console.log(err.response?.data);

    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}




function* updateTaskSaga(action) {



}


export function* theoDoiUdpateTask() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}




export function* handelChangePostApi(action) {
    // console.log('abc', action)
    //Gọi action làm thay đổi taskDetail modal
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;

            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
        };break;
        case CHANGE_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })

        };break;
        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        }break;
    }

    //Save qua api updateTaskSaga
    //Lây dữ liệu từ state.taskDetailModal 
    let { taskDetailModal } = yield select(state => state.TaskReducer);
    console.log('taskDetailModal sau khi thay đổi', taskDetailModal)
    //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });


    const taskUpdateApi = { ...taskDetailModal, listUserAsign }
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateApi.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    } catch(err) {
        console.log(err.response?.data);
        console.log(err);
    }

}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}
