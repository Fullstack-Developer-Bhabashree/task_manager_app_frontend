import React from 'react'
import { FaCheckCircle, FaEdit, FaRegTrashAlt } from "react-icons/fa"


const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
    return (
        <div className={task.completed?'task completed':'task'}>
            <p>
                <b>{index + 1}. </b>
                {task.name}
            </p>
            <div className='task-icons'>
                <FaCheckCircle color={task.completed?'green':'red'} onClick={() => setToComplete(task)} />
                <FaEdit color='purple' onClick={() => getSingleTask(task._id)} />
                <FaRegTrashAlt color='red' onClick={() => deleteTask(task._id)} />
            </div>
        </div>
    )
}

export default Task