import React, { useRef, useState } from 'react';

import { useSpring, animated } from 'react-spring'

import './DemoDragDrop.css'


const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
];


export default function DemoDragDrop(props) {

    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({})
    const tagDragEnter = useRef({});
    //Animation
    const [propsSpring, set, stop] = useSpring(() => ({ from: { bottom: -25 }, to: { bottom: 0 },config:{duration:250},reset:true }));



    const handleDragStart = (e, task, index) => {
        console.log(e.target);
        console.log('dragEnd');
        //Lưu lại giá trị của task đang drag
        tagDrag.current = task;
    }


    const handleDragEnter = (e, taskDragEnter, index) => {
        // console.log('dragEnterTag',e.target)
        // console.log('targertOver',task)
        // console.log('index',index)
        //Lưu lại giá trị của task được kéo ngang qua
        set({bottom:0});
        tagDragEnter.current = { ...taskDragEnter };

        let taskListUpdate = [...taskList];
        //Láy ra index thằng đang kéo
        let indexDragTag = taskListUpdate.findIndex(task => task.id === tagDrag.current.id);
        //Lấy ra index thằng bị kéo qua 
        let indexDragEnter = taskListUpdate.findIndex(task => task.id === taskDragEnter.id);

        //Bién6 chứa giá trị thằng đang kéo
        let temp = taskListUpdate[indexDragTag];
        //Lấy giá trị tại vi trí đang kéo gán = thằng kéo qua
        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
        //Lấy thằng kéo qua gán = đang keo
        taskListUpdate[indexDragEnter] = temp;



        setTaskList(taskListUpdate);


    }

    const handleDragEnd = (e) => {
       
    }
    const handleDrop = (e) => {
        // console.log('drop', e.target);
    }
    return (
        <div className="container" onDragOver={(e)=> {
            e.stopPropagation();
             e.preventDefault();

         }}  onDrop={(e)=> {

            tagDrag.current = {};
            console.log('dragEnd')
            setTaskList([...taskList])

         }}>
            <div className="text-center display-4">Task list</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="bg-dark p-5 col-4">
                    {taskList.map((task, index) => {

                        let cssDragTag = task.id === tagDrag.current.id ? 'dragTag' : '';

                        if (task.id === tagDragEnter.current.id) {
                            return <animated.div
                                style={{
                                    position:'relative',
                                    bottom: propsSpring.bottom.interpolate(numBottom => `${numBottom}px`)
                                }}
                                onDragStart={(e) => { handleDragStart(e, task, index) }}
                                onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                                onDragEnd={(e) => { handleDragEnd(e) }}
                                draggable="true"
                                key={index}
                                className={`bg-success text-white m-1 p-3`}
                            >


                                {task.taskName}


                            </animated.div>
                        }

                        return <div
                            onDragStart={(e) => { handleDragStart(e, task, index) }}
                            onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                            onDragEnd={(e) => { handleDragEnd(e) }}
                            draggable="true"
                            key={index}
                            className={`bg-success text-white m-1 p-3 ${cssDragTag}`}>
                            {task.taskName}
                        </div>
                    })}
                </div>
                <div className="col-2 bg-primary" style={{ height: 500 }} ></div>

            </div>

        </div>
    )
}

// onDragOver={(e)=>{
//     e.stopPropagation();
//     e.preventDefault();
// }}