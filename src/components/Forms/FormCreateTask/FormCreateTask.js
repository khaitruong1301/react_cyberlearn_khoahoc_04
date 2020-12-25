import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Radio,Slider } from 'antd';
import {useSelector,useDispatch,connect} from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/ProjectCyberBugsConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Cyberbugs/PriorityConstants';

import {withFormik} from 'formik';

import * as Yup from 'yup'
const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
 function FormCreateTask(props) {

    //Lấy dữ liệu từ redux 
    const {arrProject} = useSelector(state=>state.ProjectCyberBugsReducer);
    const {arrTaskType} = useSelector(state=>state.TaskTypeReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {userSearch} = useSelector(state => state.UserLoginCyberBugsReducer);
    //Hàm biến đổi options cho thẻ select
    const userOptions = userSearch.map((item,index) => {
        return {value:item.userId,label:item.name}
    })
    //Do kết nối với withformik => component có các props
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    const dispatch = useDispatch();


 
    
    const [size, setSize] = React.useState('default');

    const [timeTracking,setTimetracking] = useState({
        timeTrackingSpent:0,
        timeTrackingRemaining:0
    })



    //hook
    useEffect(() => {
        dispatch({type:GET_ALL_PROJECT_SAGA});
        dispatch({type:GET_ALL_TASK_TYPE_SAGA});
        dispatch({type:GET_ALL_PRIORITY_SAGA});
        dispatch({type:'GET_USER_API',keyWord:''});

    },[])

    
    

    const children = [];
    return (
        <form className="container" onSubmit={handleSubmit}>          
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control" onChange={handleChange}>
                   {arrProject.map((project,index)=>{
                       return <option key={index} value={project.id}>{project.projectName}</option>
                   })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />
            </div> 
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" onChange={handleChange}>
                            {arrPriority.map((priority,index)=>{
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" onChange={handleChange}>
                            {arrTaskType.map((taskType,index)=>{
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
                
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                    <p>Assignees</p>
                    <Select
                            
                            mode="multiple"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onChange={(values) => {
                                setFieldValue('listUserAsign',values);
                            }}
                            onSelect={(value) => { 

                              console.log(value)
                        
                            }}
                            style={{ width: '100%' }}
                        >
                            {children}
                    </Select>
                    <div className="row mt-3">
                        <div className="col-12">
                            <p>Original Estimate</p>
                            <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange}/>
                        </div>
                    </div>

                    </div>
                    <div className="col-6">
                         <p>Time tracking</p>

                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{marginTop:5}}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent:e.target.value
                                    });

                                    setFieldValue('timeTrackingSpent',e.target.value);
                                }}/>
                            </div>

                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining"  onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining:e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining',e.target.value);

                                }}/>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            setFieldValue('description',content);
                        }}
                />
            </div>
            <button type="submit">submit</button>
        </form>
    )
}





const frmCreateTask = withFormik({
    // enableReinitialize: true,
    mapPropsToValues: (props) => {
   

        return {
            taskName: '',
            description: '',
            statusId: 1,
            originalEstimate: 0,
            timeTrackingSpent:0,
            timeTrackingRemaining:0,
            projectId:0,
            typeId:0,
            priorityId:0,
            listUserAsign:[]
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({type:'CREATE_TASK_SAGA',taskObject:values})
        console.log('taskobject',values)
    },
    displayName: 'createTaskForm',
})(FormCreateTask);




export default connect() (frmCreateTask);
