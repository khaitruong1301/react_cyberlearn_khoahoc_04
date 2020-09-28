import Axios from "axios";
import Profile from "../../pages/Profile/Profile";
import { GET_TASK_API } from "../constants/ToDoListConst";


//Action có 2 loại
//Action thực thi ngay làm thay đổi reducer (action 1)
//Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)

export const getTaskListApi = () => {

    //Tiền xử lý dữ liệu => xử lý function 
    return async dispatch => {

        try {
            let { data, status, ...res } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }
        } catch (err) {
            console.log(err.response.data)
        }

        // console.log('promise',res.data)
        // promise.then((result) => {
        //     console.log(result.data);
        //     //Nếu gọi api lấy về kết quả thành công 
        //     //=> set lại state của component
        //     dispatch({
        //         type: GET_TASK_API,
        //         taskList: result.data
        //     })

        //     console.log('thành công')
        // });


        // promise.catch((err) => {
        //     console.log('thất bại')
        //     console.log(err.response.data)
        // });
    }
}



export const addTaskApi = (taskName) => {
    return async dispatch => {

        try {
            //Xử lý trước khi dispatch
            let {status,data} = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: taskName }
            });
            // console.log('res',res)
            if (status === 200) {
                dispatch(getTaskListApi())
            }
        }catch(err){
            console.log(err.response.data);
        }
        // //Xử lý thành công
        // promise.then(result => {
        //     // alert(result.data);
        //     dispatch(getTaskListApi());

        // })

        // //Xử lý thất bại
        // promise.catch(errors => {
        //     alert(errors.response.data)

        // })


    }
}


export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            //Sau khi thực hiện api gọi phương thức dispatchAction get TaskListApi để load lại task
            dispatch(getTaskListApi())
        });

        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            dispatch(getTaskListApi())
        });

        promise.catch(err => {
            alert(err.response.data);
        })
    }
}


export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });

        promise.catch(err => {
            alert(err.response.data);
        })
    }
}




