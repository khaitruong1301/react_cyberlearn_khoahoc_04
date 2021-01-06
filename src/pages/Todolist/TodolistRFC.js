import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TodolistRFC(props) {

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }


        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }


    const getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });

        promise.then((result) => {
            console.log(result.data);
            //Nếu gọi api lấy về kết quả thành công 
            //=> set lại state của component
            setState({
                ...state,
                taskList: result.data
            })

            console.log('thành công')
        });


        promise.catch((err) => {
            console.log('thất bại')

            console.log(err.response.data)
        });
    }

    const addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit form
        console.log(state.values.taskName);

        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        });

        //Xử lý thành công
        promise.then(result => {
            // alert(result.data);
            getTaskList();

        })

        //Xử lý thất bại
        promise.catch(errors => {
            alert(errors.response.data)

        })
    }

    useEffect(() => {
        getTaskList();


        return () => {

        }
    }, [])

    //Xử lý reject task
    const rejectTask = (taskName)=>{
        let promise = Axios({
            url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT'
        });
        
        promise.then(res=>{
            alert(res.data);
            getTaskList();
        });

        promise.catch(err=>{
            alert(err.response.data);
        })

    }

    //Xử lý done task
   const  checkTask = (taskName) => {
        let promise = Axios({
            url:`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method:'PUT'
        });

        promise.then(res=>{
            alert(res.data);
            getTaskList();
        });

        promise.catch(err=>{
            alert(err.response.data);
        })
    }


    //Hàm xử lý xóa task
    const delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            alert(result.data);
            getTaskList();
        });

        promise.catch(errors => {
            alert(errors.response.data)
        })
    }


    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }


    const renderTaskToDoDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        rejectTask(item.taskName)
                    }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }


    return (
        <div className="card">
            <div className="card__header">
                <img src={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
