import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaAngleDown, FaEllipsisH, FaPlus} from "react-icons/fa";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import {Dropdown} from "antd";
import ConfirmModal from "~/components/commoms/ConfirmModal";

SprintItem.propTypes = {};

function SprintItem({sprint,onEdit,onDelete}) {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const listOptions =[
        {
            key: 'edit',
            label: 'Cập nhật phiên làm việc',
        },
        {
            key: 'remove',
            label: 'Xóa phiên làm việc',
        },
    ]
    const handleOnClick=({key})=>{
        if (key==='edit') onEdit(sprint)
        else setShowConfirmDelete(true)
    }
    const handleDelete=()=>{
        onDelete(sprint)
    }

    return (
        <div className='sprint-item'>
            <div className='sprint-header'>
                <div className='sprint-info' onClick={() => setIsOpen(!isOpen)}>
                    <FaAngleDown className={`icon ${isOpen ? 'rotated' : ''}`}/>
                    <div className='sprint-name'>{sprint.name}</div>
                    <div className='sprint-time'>{`${sprint.startTime} - ${sprint.endTime}`}</div>
                    <div className='total-task'>{`( ${sprint.listTasks.length} công việc )`}</div>

                </div>
                <div className='sprint-action'>
                    <div className='sprint-status'>
                        <span className={'status-none'}>1</span>
                        <span className={'status-low'}>1</span>
                        <span className={'status-middle'}>1</span>
                        <span className={'status-highly'}>1</span>
                    </div>
                    <button className='action-sprint'>
                        {sprint.status === 1 ? 'Bắt Đầu' : 'Kết Thúc'}
                    </button>
                    <Dropdown
                        menu={{
                            items:listOptions,
                            onClick:handleOnClick,
                        }}
                        trigger={['click']}
                    >
                        <button className='btn-action'><FaEllipsisH className='dot'/></button>
                    </Dropdown>

                </div>
            </div>
            {!!isOpen && (<div className='sprint-content'>

                    <div className={`list-task ${sprint.listTasks.length>0 ?'':'dashed'}`}>
                        {
                            sprint.listTasks.map(task =>(
                                <TaskItem task={task} type={'long'} />
                            ))
                        }

                    </div>


                    <button className='add-task'>
                        <FaPlus className={'icon-add'}/>
                        Thêm Công Việc
                    </button>
                </div>
            )}
            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Phiên <strong>${sprint.name}</strong>  ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setShowConfirmDelete(false)}
                          onOK={handleDelete}/>
        </div>
    );
}

export default SprintItem;