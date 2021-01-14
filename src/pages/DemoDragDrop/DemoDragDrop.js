import React, { useState } from 'react'

const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
]


export default function DemoDragDrop(props) {

    const [taskList, setTaskList] = useState(defaultValue);


    const handleDragStart = (e, task, index) => {
        // console.log('tag',e.target);
        // console.log('task',task);
        // console.log('index',index);
    }


    const handleDragOver = (e) => {
        // console.log('targertOver',e.target)
     
    }

    const handleDragEnd = (e) => {
        // console.log('dragEnd', e.target);
       
    }
    const handleDrop = (e) => {
        console.log('drop', e.target);
    }
    return (
        <div className="container">
            <div className="text-center display-4" onDragOver={handleDragOver}>Task list</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="bg-dark p-5 col-4">
                    {taskList.map((task, index) => {
                        return <div
                            onDragStart={(e) => { handleDragStart(e, task, index) }}
                            onDragEnter={handleDragOver}
                            onDragEnd={(e) => { handleDragEnd(e) }}
                            draggable="true"
                            key={index}
                            className="bg-success text-white m-1 p-3">
                            {task.taskName}
                        </div>
                    })}
                </div>
                <div className="col-2 bg-primary" style={{ height: 500 }}  onDragOver={(e)=>{
                       e.stopPropagation();
                       e.preventDefault();
                }} onDrop={(e) => { handleDrop(e) }}>
                    dsadsasda
                </div>

            </div>

        </div>
    )
}
