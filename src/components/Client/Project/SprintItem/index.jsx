import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaAngleDown, FaEllipsisH, FaPlus} from "react-icons/fa";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import {Dropdown, Modal} from "antd";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {getListNameColumn} from "~/utils/sorts";
import {initialData} from "~/asset/data/initalDataTask";
import EditSprint from "~/components/Client/Project/EditSprint";

SprintItem.propTypes = {};

function SprintItem({sprint,onEdit,onDelete}) {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const [showEditSprint,setShowEditSprint]=useState(false)
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
        if (key==='edit') {
           setShowEditSprint(true)
        }
        else setShowConfirmDelete(true)
    }
    const handleDelete=()=>{
        onDelete(sprint)
    }

    const listStatus=[
        {
            id:'column-1',
            name:'Chuan bi'
        },
        {
            id:'column-2',
            name:'Chuan bi'
        },
        {
            id:'column-3',
            name:'Chuan bi'
        },
    ]
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
                        {
                            listStatus.map((item)=>(
                                <span className={`status-${item.id}`}>1</span>

                            ))
                        }
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
            <Modal title="Cập Nhât" open={showEditSprint}
                   destroyOnClose
                   maskClosable={true}
                   onCancel={()=>setShowEditSprint(false)}
                   footer={null}
                   width={700}
                   style={{top: 150}}
            >
                <EditSprint sprint={sprint} onClose={()=>setShowEditSprint(false)} onSave={onEdit} />
            </Modal>
            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Phiên <strong>${sprint.name}</strong>  ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setShowConfirmDelete(false)}
                          onOK={handleDelete}/>
        </div>
    );
}

export default SprintItem;