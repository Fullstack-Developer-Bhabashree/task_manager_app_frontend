import React, { useEffect, useState } from 'react'
import Task from './Task'
import TaskForm from './TaskForm'
import { URL } from '../App'
import { toast } from "react-toastify"
import LoadingImg from '../assets/loader.gif'

import axios from "axios"


const TaskList = () => {

    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState(null)


    const initialState = {
        name: "",
        completed: false
    }
    const [formData, setFormData] = useState(initialState);

    const { name } = formData

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        const comTask = tasks.filter((task) => {
            return task.completed === true
        })
        setCompletedTasks(comTask)
    }, [tasks])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const createTask = async (e) => {
        e.preventDefault();

        if (name === "") {
            return toast.error("Name of the Task can't be empty")
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData)
            toast.success("Task created successfully")
            setFormData({ name: "", completed: false })
        } catch (error) {
            toast.error(error.message);
        }
        getTasks()
    }

    const getTasks = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/tasks`)
            console.log(data)
            setIsLoading(false)
            setTasks(data)
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const deleteTask = async (id) => {

        try {
            await axios.delete(`${URL}/api/task/${id}`)
            toast.success("Task deleted successfully")
        } catch (error) {
            toast.error(error.message);
        }
        getTasks()
    }

    const getSingleTask = async (id) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/task/${id}`)
            setFormData({ name: data.name, completed: data.completed })
            setIsEditing(true)
            setIsLoading(false)
            setTaskId(id)
            console.log(data)
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const updateTask = async (e) => {
        e.preventDefault();
        console.log(taskId);
        if (name === "") {
            return toast.error("Name of the Task can't be empty")
        }
        try {
            await axios.put(`${URL}/api/task/${taskId}`, formData)
            toast.success("Task updated successfully")
            setIsEditing(false)
            setFormData({ ...formData, name: "" })
            console.log(isEditing)
        } catch (error) {
            toast.error(error.message);
        }
        getTasks()
    }

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`${URL}/api/task/${task._id}`, newFormData)
            toast.success(`${task.name} is completed`)
        }
        catch (error) {
            toast.error(error.message)
        }
        getTasks()
    }






    return (
        <div>

            <h2>Task Manager</h2>

            <TaskForm
                createTask={createTask}
                name={name}
                handleInputChange={handleInputChange}
                isEditing={isEditing}
                updateTask={updateTask}
            />
            {
                tasks.length > 0 && (
                    <div className='--flex-between --pb'>
                        <p>
                            <b>Total Tasks: </b>{tasks.length}
                        </p>
                        <p>
                            <b>Completed Tasks: </b>{completedTasks.length}
                        </p>
                    </div>
                )
            }

            <hr />
            {
                isLoading && (
                    <div className='--flex-center'>
                        <img src={LoadingImg} alt='Loading' />
                    </div>
                )
            }
            {
                !isLoading && tasks.length === 0 ? (
                    <p className='--py'>No task created. Please create a task</p>
                )
                    :
                    (
                        <>
                            {
                                tasks.map((task, index) => {
                                    return (<Task
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        deleteTask={deleteTask}
                                        getSingleTask={getSingleTask}
                                        setToComplete={setToComplete}
                                    />)
                                })
                            }
                        </>
                    )
            }

        </div>
    )
}

export default TaskList