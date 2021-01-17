import React, { useRef, useState } from 'react';
import './Demo.css';
import { useSpring, useSprings, animated } from 'react-spring'

const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
]


export default function Demo(props) {

    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({});
    const tagDragEnter = useRef({});
    const [propsSpring, set, stop] = useSpring(() => ({ to: { rotate: 25, bottom: 0 }, from: { rotate: 0, bottom: -50 }, config: { duration: 250 }, reset: true }))

    const handleDragStart = (e, task, index) => {
        console.log(e.target);
        console.log(task);
        //Lưu lại giá trị của task đang drag
        tagDrag.current = task;
    }


    const handleDragEnter = (e, taskDragEnter, index) => {
        // console.log('dragEnterTag',e.target)
        // console.log('targertOver',task)
        // console.log('index',index)
        set({ bottom: 0 })
       

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

        tagDragEnter.current = taskDragEnter;

        setTaskList(taskListUpdate);



    }

    const handleDragEnd = (e) => {


    }
    const handleDrop = (e) => {
        // console.log('drop', e.target);
    }
    return (
        <div className="container" onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}
            onDrop={(e) => {
                tagDrag.current = {}
                setTaskList([...taskList])
            }}
        >
            <div className="text-center display-4">Task list</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="bg-dark p-5 col-4">
                    {taskList.map((task, index) => {

                        let cssDrag = task.id === tagDrag.current.id ? 'tagDrag' : ''
                        let cssDragEnter = tagDragEnter.current.id == task.id ? 'tagDragEnter' : '';
                        if (cssDragEnter !== '') {
                            return <animated.div
                                style={{
                                    transform: propsSpring.bottom.interpolate(r => `${r}px`),
                                    position: 'relative',
                                    bottom: propsSpring.bottom.interpolate(r => `${r}px`),


                                }}

                                onDragStart={(e) => { handleDragStart(e, task, index) }}
                                onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                                draggable="true"
                                onDragEnd={(e) => { handleDragEnd(e) }}
                                onDragLeave={(e) => { handleDragEnd(e) }}
                                key={index}
                                className={`bg-success text-white m-1 p-3 ${cssDrag} ${cssDragEnter}`}>
                                {task.taskName}
                            </animated.div>
                        } else {
                            return <div

                                onDragStart={(e) => { handleDragStart(e, task, index) }}
                                onDragEnter={(e) => { handleDragEnter(e, task, index) }}
                                draggable="true"
                                onDragEnd={(e) => { handleDragEnd(e) }}
                                onDragLeave={(e) => { handleDragEnd(e) }}

                                key={index}
                                className={`bg-success text-white m-1 p-3 ${cssDrag} ${cssDragEnter}`}>
                                {task.taskName}
                            </div>
                        }
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