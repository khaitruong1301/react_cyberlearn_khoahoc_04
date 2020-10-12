import Axios from 'axios'
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst';
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )
*/

/*
    01/01/2020 Khải viết chức năng getTask
    Action saga lấy danh sách task từ api 
*/
function* getTaskApiAction(action) {
    //put giống dispatch action
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(300);
        if (status === STATUS_CODE.SUCCESS) {
            //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk) 
            yield put({
                type: GET_TASK_API,
                taskList: data
            });
        } else {
            console.log('error')
        }
    }
    catch (err) {
        console.log('err')
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}

/*
    01/01/2020 Khải viết chức năng addTask
    Action saga nghiệp vụ thêm task
*/

function* addTaskApiAction(action) {
    const { taskName } = action;
    //Gọi api
    try {
        const { data, status } = yield call(() => { return toDoListService.addTaskApi(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }
    //Hiển thị loading
    //thành công thì load lại task = cách gọi lại action saga load tasklist
}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

/*
    01/01/2020 Khải viết chức năng deleteTask
    Action saga nghiệp vụ xóa task
*/

function* deleteTaskApi(action) {
    console.log(action)
    const { taskName } = action;
    try {
        //Gọi api deletetask
        const { data, status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName);
        });

        if (status === STATUS_CODE.SUCCESS) {
            //Nếu thành công thì gọi lại action GET_TASKLIST_API(action saga thực thi)
            yield put({
                type: GET_TASKLIST_API,
            })
        }

    } catch (err) {
        console.log(err);
    }
}



export function* theoDoiActionDeleteTask() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi)
}



/*
    01/01/2020 Khải viết chức năng deleteTask
    Action saga thực hiện nghiệp vụ done task
*/

function* checkDoneTaskApi(action) {
    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return toDoListService.checkDoneTask(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.log(error);
    }

}



export function* theoDoiDoneTask() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi)
}



/*
    01/01/2020 Khải viết chức năng deleteTask
    Action saga thực hiện nghiệp vụ reject task
*/
export function* rejectTaskApi(action) {
    const { taskName } = action;

    try{
        const {data,status} = yield call (()=>{
            return toDoListService.rejectTask(taskName);
        })
        
        if(status === STATUS_CODE.SUCCESS) {
            yield put ({
                type:GET_TASKLIST_API
            })
        }
    }catch(err) {
        console.log(err)
    }


}


export function* theoDoiRejectTask() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApi)
}

