import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
    const userLogin = useSelector(state => state.UserLoginCyberBugsReducer.userLogin)
    return (
        <div>
            {userLogin?.name}
            <img src={userLogin?.avatar} />
        </div>
    )
}



