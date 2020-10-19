import React from 'react'
import {useDispatch} from 'react-redux'
import Login from '../Login/Login';
import Register from '../Register/Register';
export default function DemoHOCModal() {

    const dispatch = useDispatch();

    return (
        <div>
            {/* Button trigger modal */}
            <button onClick={() => {
                dispatch({
                    type:'OPEN_FORM',
                    Component: <Login />
                })


            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Đăng nhập
            </button>

            <button onClick={() => {
                dispatch({
                    type:'OPEN_FORM',
                    Component:<Register />
                })

            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Đăng ký
            </button>

        </div>
    )
}
