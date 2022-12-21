import React from 'react'

const TaskForm = ({ createTask, name, handleInputChange, isEditing, updateTask }) => {
    
    return (
        <form className='task-form' onSubmit= {isEditing ? updateTask : createTask }>
            <input type="text"
             placeholder="create a task" 
             name='name' 
             value={name} 
             onChange={handleInputChange} 
             />
            <button
             type='submit'
             >
             {isEditing ? "Edit":"Create" }
             </button>
        </form>
    )
}

export default TaskForm