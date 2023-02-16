import React from 'react';
import  "./TaskItem.scss";
import {FaPen} from "react-icons/fa";

function TaskItem({task}) {
    return (
        <div className='task-item'>
           <div className='header-task-item'>
               <span className='task-title'>{`${task.title}`}</span>
               <FaPen className='btn-edit-task' />
           </div>
            { !!task.cover &&(
            <div className='thumbnail'>
                 <img src={task.cover} alt='img' className='img-thumbnail-task'/>
            </div>)
            }


        </div>
    );
}

export default TaskItem;