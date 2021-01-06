import React from 'react'
import {useDispatch} from 'react-redux'
import { GET_TASK_DETAIL_SAGA } from '../../../redux/constants/Cyberbugs/TaskConstants';
export default function ContentMain(props) {

    const {projectDetail} = props;
    const dispatch = useDispatch();
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((taskListDetail,index) => {
            return <div key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }} >
            <div className="card-header">
                {taskListDetail.statusName}
            </div>
            <ul className="list-group list-group-flush">
                {taskListDetail.lstTaskDeTail.map((task,index)=> {
                    return <li key={index} className="list-group-item"  data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} onClick={()=> {
                        dispatch({type:GET_TASK_DETAIL_SAGA,taskId:task.taskId});
                    
                    }}>
                    <p className="font-weight-300">
                       {task.taskName}
                    </p>
                    <div className="block" style={{ display: 'flex' }}>
                        <div className="block-left">
                            <p className="text-danger">{task.priorityTask.priority}</p>
                            {/* <i className="fa fa-bookmark" />
                            <i className="fa fa-arrow-up" /> */}
                        </div>
                        <div className="block-right">
                            <div className="avatar-group" style={{ display: 'flex' }}>
                                {task.assigness.map((mem,index) => {
                                    return <div className="avatar" key={index}>
                                    <img src={mem.avatar} alt={mem.avatar} />
                                </div>
                                })}

                                
                               
                            </div>
                        </div>
                    </div>
                </li>
                })}

                
              
            </ul>
        </div>
        })
    }


    return (
        <div className="content" style={{ display: 'flex' }}>
            
                {renderCardTaskList()}
        </div>


    )
}



{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    SELECTED FOR DEVELOPMENT 2
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    IN PROGRESS 2
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
    DONE 3
</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */}