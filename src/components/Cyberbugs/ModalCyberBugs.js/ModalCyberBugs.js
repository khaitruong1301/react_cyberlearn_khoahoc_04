import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/Cyberbugs/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Cyberbugs/PriorityConstants';

export default function ModalCyberBugs(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
    }, [])


    console.log('taskDetailModal', taskDetailModal)


    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return jsxDescription;
    }

    const renderTimeTracking = () => {

        const {timeTrackingSpent,timeTrackingRemaining} = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round( Number(timeTrackingSpent)/max * 100 )

        return <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
        </div>
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                          •
                          <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {

                                        }}>
                                            {arrStatus.map((status, index) => {


                                                return <option value={status.statusId} key={index}>{status.statusName}</option>

                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex' }}>
                                            {
                                                taskDetailModal.assigness.map((user, index) => {
                                                    return <div key={index} style={{ display: 'flex' }} className="item">


                                                        <div className="avatar">
                                                            <img src={user.avatar} alt={user.avatar} />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                        </p>
                                                    </div>
                                                })
                                            }

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className="form-control" value={taskDetailModal.priorityTask?.priorityId} onChange={(e) => {

                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}


                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {
                                            renderTimeTracking()
                                        }

                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
