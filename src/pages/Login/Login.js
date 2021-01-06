import React, { useState } from 'react'
import { Prompt } from 'react-router-dom';




export default function Login(props) {

    const [userLogin,setUserLogin] = useState({userName:'',passWord:'',status:false})


    console.log(userLogin)
    const handleChange = (event) => {
        const {name,value} = event.target;

        const newUserLogin = {
            ...userLogin,
            [name]:value
        };


        let valid = true;
        for(let key in newUserLogin) {
            if(key !== 'status') {
                if(newUserLogin[key].trim()===''){
                    valid = false;
                }
            }
        }

        if(!valid) {
            newUserLogin.status = true;
        }else {
            newUserLogin.status = false;
        }

        setUserLogin(newUserLogin);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if(userLogin.userName === 'cyberlearn' && userLogin.passWord==='cyberlearn') {
            //Thành công thì chuyển về trang trước đó
            // props.history.goBack();
            //Chuyển đến trang chỉ định sau khi xử lý
            // Chuyển hướng đến path tương ứng
            //  props.history.push('/home');
            //replace thay đổi nội dung path tương ứng
            // props.history.replace('/home');
            props.history.goBack();
            localStorage.setItem('userLogin',JSON.stringify(userLogin))

        }else {
            alert('Login fail !')
            return;
        }
    }

    return (
        <form className="container" onSubmit={handleLogin}>
            <h3 className="display-4">Login</h3>
            <div className="form-group">
                <p>User Name</p>
                <input name="userName" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <p>Password</p>
                <input name="passWord" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
               <button className="btn btn-success">Đăng nhập</button>
            </div>
            <Prompt when={userLogin.status} message={(location) => {
                return 'Bạn có chắc muốn rời khỏi trang này !'
            }} />
        </form>
    )
}
