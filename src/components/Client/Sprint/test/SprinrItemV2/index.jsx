import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {config} from "~/config";
import {setSprint} from "~/redux/reducer/project/projectReducer";
import {FaAngleDown, FaChartLine, FaEllipsisH, FaPlus, FaStarOfDavid, FaTimes, FaTrophy} from "react-icons/fa";
import {conCatArrayInArray, getTotalTaskInColumn, splitArrayByKey} from "~/utils/sorts";
import {Dropdown, message, Modal} from "antd";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import TextArea from "antd/es/input/TextArea";
import EditSprint from "~/components/Client/Sprint/EditSprint";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {Container, Draggable} from "react-smooth-dnd";
import './SprintItem.scss'
import dayjs from "dayjs";
import {createTask} from "~/api/Client/Task/taskAPI";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";

SprintItemV2.propTypes = {};
// 0: chưa active
// 1: active
// 2: complete
// 3: cancel
function SprintItemV2({
                          sprint,
                          listStatus,
                          onEdit,
                          onDelete,
                          column,
                          onCardDrop,
                          onCreateTask,
                          onDeleteTask,
                          onUpdateTask
                      }) {
    //console.log('check nè', splitArrayByKey(sprint.tasks,'board_column_id'))
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [showCompleteSprint, setShowCompleteSprint]=useState()
    const [showEditSprint, setShowEditSprint] = useState(false)
    const [isCreateTask, setIsCreateTask] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [valueNewTask, setValueNewTask] = useState()
    const userLogin=useSelector(getUserSelector)
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
        onDelete(sprint)
        setShowConfirmDelete(false)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRunSprint = () => {
        if (sprint.status===1){
            setShowCompleteSprint(true)
        }
        else {
            if (sprint.status === 0) {
                onEdit(sprint.id, {...sprint, status: 1})
                navigate(config.routes.project)
                const project = JSON.parse(localStorage.getItem("project"))
                project.currentSprint = sprint.id
                localStorage.setItem('project', JSON.stringify(project))
                dispatch(setSprint(sprint))
            }
            setShowEditSprint(false)
        }
    }
    const handleUpdateSprint = (id, data) => {
        onEdit(id, data)
        setShowEditSprint(false)
    }
    console.log(userLogin)
    const handleCreateTask = async () => {
        const newCardToAdd = {
            // id: Math.random().toString(36).substr(2, 5),
            employee_id:userLogin.id,
            sprint_id: sprint.id,
            project_id: sprint.project_id,
            board_column_id: 1,
            assignee_employee: null,
            report_employee: userLogin,
           // report_employee: null,
            title: valueNewTask,
            description: "",
            priority: 1,
            subtasks: [],
            attachments: [],
            comments: [],
            estimate_point: 3,
            status: 1,
            task_histories:[],
            sort:1,
        }

        // add new card to Sprint
        const newSprint = {...sprint}
        newSprint.tasks.push(newCardToAdd)
        // const currentColumn = newSprint.columns.map((col) => {
        //     if(col.id === newCardToAdd.columnId ){
        //         const newCards = col.cards.push(newCardToAdd);
        //         const newCardOrder = col.cards.map((card => card.id))
        //      return   {...col, cards: newCards, cardOrder: newCardOrder}
        //     }
        //     else  return col
        //
        // })
        //  onSprint(newSprint)

        // call  API tạo task
        const result = await createTask(newCardToAdd)
        if(result.status===1){
            setValueNewTask('')
            setIsCreateTask(false)
           // onCreateTask(newCardToAdd)
        }
        else {
            messageApi.open({
                type:'error',
                message:result.message,
                duration:1.3,
            })
            setIsCreateTask(false)
            setValueNewTask('')

        }
        console.log('Test them task ', newSprint)

    }

    const cards = sprint.tasks//conCatArrayInArray(sprint.columns);
    const handleCompleteSprint=()=>{
        onEdit(sprint.id, {...sprint, status:2})
    }
    return (
        <div className={`sprint-item ${sprint.status === -1 ? 'backlog' : ''}`}>
            {contextHolder}
            <div className='sprint-header'>
                <div className='sprint-info' onClick={() => setIsOpen(!isOpen)}>
                    <FaAngleDown className={`icon ${isOpen ? 'rotated' : ''}`}/>
                    <div className='sprint-name'>{sprint.title}</div>
                    {
                        sprint.status !== -1 && (
                            <div
                                className='sprint-time'>{`${dayjs(sprint.start_date).format('DD/MM/YYYY')} - ${dayjs(sprint.end_date).format('DD/MM/YYYY')}`}</div>
                        )
                    }
                    <div className='total-task'>{`( ${sprint.tasks.length} công việc )`}</div>

                </div>
                {
                    sprint.status !== -1 && (
                        <div className='sprint-action'>
                            <div className='sprint-status'>
                                {
                                    splitArrayByKey(sprint.tasks,'board_column_id').map((item, index) => (
                                        <span key={index} className={`status-${item.id}`}>{!!item.cards.length?item.cards.length:0}</span>

                                    ))
                                }
                            </div>
                            <button className={`action-sprint ${sprint.status === 1 ? 'on' : 'off'}`}
                                    onClick={handleRunSprint}>
                                {sprint.status === 0 ? 'Bắt Đầu' : 'Hoàn Thành'}
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
                                        <TaskItem task={task} columns={listStatus} type={'long'}/>
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
            <Modal title="" open={showCompleteSprint}
                   destroyOnClose
                   maskClosable={true}
                   onCancel={() => setShowCompleteSprint(false)}
                   footer={null}
                   width={450}
                   style={{top: 80}}
            >
                <div className='notify-complete-sprint'>
                    <div className='header-complete-sprint'>
                      <div className='info-title'>
                          <FaTrophy className="icon"/>
                          <span className={'title'}>Hoàn Thành Chu Kỳ</span>
                      </div>
                    </div>
                    <div className='content-complete-sprint'>
                        <h4 className={'title'}><FaChartLine className='icon' />Thống Kê</h4>
                        <ul className={'statistics'}>
                            <li className={'statistic-item'}> <FaStarOfDavid className={'icon-statistic-item'} /> Tổng Số Công Việc: </li>
                            <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} /> Công Việc Hoàn Thành: </li>
                            <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} /> Thời Gian Triển Khai: </li>
                        </ul>
                        <span className={'description'}>
                            Các công việc chưa hoàn thành sẽ được duy chuyển vào <b>Lưu Trữ</b>.
                        </span>
                    </div>
                    <div className={'footer-complete-sprint'}>
                        <button className={'btn-complete'} onClick={handleCompleteSprint}>Hoàn Thành</button>
                        <button className={'btn-cancel'} onClick={() => setShowCompleteSprint(false)}>Hủy</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default SprintItemV2;