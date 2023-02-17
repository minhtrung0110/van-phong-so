import React from 'react';
import "./TaskItem.scss";
import {FaPen} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setDetailTask} from "~/redux/reducer/task/taskReducer";

function TaskItem({task, onShowDetail}) {
    const dispatch = useDispatch()
    const handleShowDetail = () => {
        dispatch(setDetailTask(task))
        onShowDetail(true)
    }
    return (
        <div className='task-item' onClick={handleShowDetail}>
            <div className='header-task-item'>
                <span className='task-title'>{`${task.title}`}</span>
                <FaPen className='btn-edit-task'/>
            </div>
            {!!task.cover && (
                <div className='thumbnail'>
                    <img src={task.cover} alt='img' className='img-thumbnail-task'/>
                </div>)
            }


        </div>
    );
}

export default TaskItem;