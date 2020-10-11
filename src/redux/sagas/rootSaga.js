import Axios from 'axios'
import { call, delay, fork, take, takeEvery, takeLatest,put } from 'redux-saga/effects'
import { GET_TASK_API } from '../constants/ToDoListConst'
/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

*/
function* getTaskApi(action) {

    let {data,status} = yield call(() => {
        return Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
    })
    //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk) 
    yield put({
        type:GET_TASK_API,
        taskList:data
    })
}


export function* rootSaga() {

    yield takeLatest('getTaskApiAction', getTaskApi)


}