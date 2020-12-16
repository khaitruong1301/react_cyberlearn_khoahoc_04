import React, { useEffect } from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'
import {useSelector,useDispatch} from 'react-redux'



export default function IndexCyberBugs(props) {

    const {projectDetail} = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();

    console.log('projectDetail',projectDetail)

    useEffect(()=>{
        //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
        const {projectId} = props.match.params;
        dispatch({
            type:'GET_PROJECT_DETAIL',
            projectId
        })
        
    },[])

    return (
        <div className="main">
            <HeaderMain />

            <InfoMain />

            <ContentMain />
        </div>

    )
}
