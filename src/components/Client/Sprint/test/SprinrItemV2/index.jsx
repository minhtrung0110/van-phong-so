import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {config} from "~/config";
import {setSprint} from "~/redux/reducer/project/projectReducer";
import {FaAngleDown, FaEllipsisH, FaPlus, FaTimes} from "react-icons/fa";
import {conCatArrayInArray, getTotalTaskInColumn} from "~/utils/sorts";
import {Dropdown, Modal} from "antd";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import TextArea from "antd/es/input/TextArea";
import EditSprint from "~/components/Client/Sprint/EditSprint";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {Container, Draggable} from "react-smooth-dnd";
import './SprintItem.scss'
import dayjs from "dayjs";

SprintItemV2.propTypes = {};
// 0: chưa active
// 1: active
// 2: complete
// 3: cancel
function SprintItemV2({sprint,listStatus, onEdit, onDelete, column, onCardDrop, onCreateTask, onDeleteTask, onUpdateTask}) {
    // console.log('check nè', conCatArrayInArray(sprint.columns))
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [showEditSprint, setShowEditSprint] = useState(false)
    const [isCreateTask, setIsCreateTask] = useState(false)
    const [valueNewTask, setValueNewTask] = useState()
    const listOptions = [
        {
            key: 'edit',
            label: 'Cập nhật phiên làm việc',
        },
        {
            key: 'remove',
            label: 'Xóa phiên làm việc',
        },
    ]
    const handleOnClick = ({key}) => {
        if (key === 'edit') {
            setShowEditSprint(true)
            dispatch(setSprint(sprint))
        } else setShowConfirmDelete(true)
    }
    const handleDelete = () => {
        onDelete(sprint.id)
        setShowConfirmDelete(false)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRunSprint = () => {
        onEdit(sprint.id,{...sprint, status: sprint.status === 2 ? 0 : 2})
        if (sprint.status === 0) {
            navigate(config.routes.project)
            const project = JSON.parse(localStorage.getItem("project"))
            project.currentSprint = sprint.id
            localStorage.setItem('project', JSON.stringify(project))
            dispatch(setSprint(sprint))
        }
        setShowEditSprint(false)
    }
    const handleUpdateSprint = (id,data) => {
        onEdit(id,data)
        setShowEditSprint(false)
    }
    const handleCreateTask = () => {
        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: sprint.boardId,
            columnId: 'column-1',
            sprintID: sprint.id,
            title: valueNewTask,
            description: '',
            startTime: null,
            endTime: null,
            priority: 'none',
            members: [],
            todoList: [],
            fileList: [],
            comments: [],
        }
        // add new card to Sprint
        const newSprint = {...sprint}
        const currentColumn = newSprint.columns.map((col) => {
            if(col.id === newCardToAdd.columnId ){
                const newCards = col.cards.push(newCardToAdd);
                const newCardOrder = col.cards.map((card => card.id))
             return   {...col, cards: newCards, cardOrder: newCardOrder}
            }
            else  return col

        })
        //  onSprint(newSprint)
      //  console.log('Test them task ', currentColumn, newSprint)
        setValueNewTask('')
        setIsCreateTask(false)
        onCreateTask(newCardToAdd)
    }

    const cards = sprint.tasks//conCatArrayInArray(sprint.columns);
    return (
        <div className={`sprint-item ${sprint.status === -1 ? 'backlog' : ''}`}>
            <div className='sprint-header'>
                <div className='sprint-info' onClick={() => setIsOpen(!isOpen)}>
                    <FaAngleDown className={`icon ${isOpen ? 'rotated' : ''}`}/>
                    <div className='sprint-name'>{sprint.title}</div>
                    {
                        sprint.status !== -1 && (
                            <div className='sprint-time'>{`${dayjs(sprint.startTime).format('DD/MM/YYYY')} - ${dayjs(sprint.endTime).format('DD/MM/YYYY')}`}</div>
                        )
                    }
                    <div className='total-task'>{`( ${ sprint.tasks.length} công việc )`}</div>

                </div>
                {
                    sprint.status !== -1 && (
                        <div className='sprint-action'>
                            <div className='sprint-status'>
                                {
                                    listStatus.map((item, index) => (
                                        <span key={index} className={`status-${item.id}`}>1</span>

                                    ))
                                }
                            </div>
                            <button className={`action-sprint ${sprint.status === 1 ? 'on' : 'off'}`}
                                    onClick={handleRunSprint}>
                                {sprint.status === 0 ?'Bắt Đầu': 'Hoàn Thành'}
                            </button>
                            <Dropdown
                                menu={{
                                    items: listOptions,
                                    onClick: handleOnClick,
                                }}
                                trigger={['click']}
                            >
                                <button className='btn-action'><FaEllipsisH className='dot'/></button>
                            </Dropdown>

                        </div>
                    )
                }
            </div>
            {!!isOpen && (<div className='sprint-content'>

                    <div className={`list-task ${sprint.tasks.length > 0 ? '' : 'dashed'}`}>
                        <Container
                            groupName="col"
                            onDrop={dropResult => onCardDrop(column.id, dropResult)}
                            getChildPayload={index => cards[index]}
                            dragClass="card-ghost"
                            dropClass="card-ghost-drop"
                            dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'drop-preview'
                            }}
                            dropPlaceholderAnimationDuration={200}
                        >
                            {
                                sprint.tasks.map((task, index) => (
                                    <Draggable key={index}>
                                        <TaskItem task={task}  columns={listStatus} type={'long'}/>
                                    </Draggable>
                                ))
                            }
                        </Container>


                    </div>

                    {
                        isCreateTask && (
                            <div className='create-new-task-area'>
                                <TextArea rows={3}
                                          placeholder='Nhập công việc'
                                          className='input-enter-card'
                                          value={valueNewTask}
                                          onChange={e => setValueNewTask(e.target.value)}
                                    // ref={newCardRef}
                                          onKeyDown={event => (event.key === 'Enter') && handleCreateTask()}
                                />


                                <div className='box-btn'>
                                    <button className='btn-create-task'
                                            onClick={handleCreateTask}
                                    >Tạo
                                    </button>
                                    <FaTimes className='cancel-new-task'
                                             onClick={() => setIsCreateTask(false)}
                                    />
                                </div>
                            </div>
                        )
                    }
                    {
                        !isCreateTask &&
                        <button className='add-task' onClick={() => setIsCreateTask(true)}>
                            <FaPlus className={'icon-add'}/>
                            Thêm Công Việc
                        </button>
                    }
                </div>
            )}
            <Modal title="Cập Nhât" open={showEditSprint}
                   destroyOnClose
                   maskClosable={true}
                   onCancel={() => setShowEditSprint(false)}
                   footer={null}
                   width={700}
                   style={{top: 150}}
            >
                <EditSprint sprint={sprint} onClose={() => setShowEditSprint(false)} onSave={handleUpdateSprint}/>
            </Modal>
            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div
                              dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Phiên <strong>${sprint.name}</strong>  ? `}}/>}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setShowConfirmDelete(false)}
                          onOK={handleDelete}/>
        </div>
    );
}

export default SprintItemV2;