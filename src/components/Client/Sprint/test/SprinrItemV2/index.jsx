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
SprintItemV2.propTypes = {

};

function SprintItemV2({sprint,onEdit,onDelete,column, onCardDrop, onUpdateColumn,onDeleteTask,onUpdateTask}) {
   // console.log('check nè', conCatArrayInArray(sprint.columns))
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmDelete,setShowConfirmDelete] = useState(false)
    const [showEditSprint,setShowEditSprint]=useState(false)
    const [isCreateTask,setIsCreateTask] = useState(false)
    const [valueNewTask,setValueNewTask] = useState()
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
        setShowConfirmDelete(false)
    }
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleRunSprint=()=>{
        onEdit({...sprint,status:sprint.status===1?0:1})
        if(sprint.status===0){
            navigate(config.routes.project)
            const project=JSON.parse(localStorage.getItem("project"))
            project.currentSprint=sprint.id
            localStorage.setItem('project',JSON.stringify(project))
            dispatch(setSprint(sprint))
        }

        setShowEditSprint(false)
    }
    const handleUpdateSprint=(data)=>{
        onEdit(data)
        setShowEditSprint(false)
    }
    const handleCreateTask = () => {
        // const newCardToAdd = {
        //     id: Math.random().toString(36).substr(2, 5),
        //     boardId: column.boardId,
        //     columnId: column.id,
        //     title: valueNewCard,
        //     description: '',
        //     startTime:'01/10/2022',
        //     endTime:'31/12/2022',
        //     priority:'none',
        //     members:[],
        //     todoList:[],
        //     fileList:[],
        //     comments:[],
        // }
        // let newColumn = cloneDeep(column)
        // newColumn.cards.push(newCardToAdd)
        // newColumn.cardOrder.push(newCardToAdd.id)
        // // truyền lên board Content
        // onUpdateColumn(newColumn)
        //
        // // clear up
        // setValueNewCard('')

        setValueNewTask('')
        setIsCreateTask(false)


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
    const cards =  conCatArrayInArray(sprint.columns);
    return (
        <div className={`sprint-item ${sprint.status===-1 ?'backlog':''}`}>
            <div className='sprint-header'>
                <div className='sprint-info' onClick={() => setIsOpen(!isOpen)}>
                    <FaAngleDown className={`icon ${isOpen ? 'rotated' : ''}`}/>
                    <div className='sprint-name'>{sprint.name}</div>
                    {
                        sprint.status!==-1 && (
                            <div className='sprint-time'>{`${sprint.startTime} - ${sprint.endTime}`}</div>
                        )
                    }
                    <div className='total-task'>{`( ${conCatArrayInArray(sprint.columns).length} công việc )`}</div>

                </div>
                {
                    sprint.status!==-1 && (
                    <div className='sprint-action'>
                    <div className='sprint-status'>
                {
                    listStatus.map((item,index)=>(
                    <span key={index} className={`status-${item.id}`}>1</span>

                    ))
                }
                    </div>
                    <button className={`action-sprint ${sprint.status===1?'on':'off'}`} onClick={handleRunSprint}>
                {sprint.status === 0 ? 'Bắt Đầu' : 'Hoàn Thành'}
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
                    )
                }
            </div>
            {!!isOpen && (<div className='sprint-content'>

                    <div className={`list-task ${sprint.columns.length>0 ?'':'dashed'}`}>
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
                                conCatArrayInArray(sprint.columns).map((task,index) =>(
                                    <Draggable key={index}>
                                        <TaskItem   task={task} type={'long'}/>
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
                                    >Tạo</button>
                                    <FaTimes className='cancel-new-task'
                                             onClick={() => setIsCreateTask(false)}
                                    />
                                </div>
                            </div>
                        )
                    }
                    {
                        !isCreateTask &&
                        <button className='add-task' onClick={()=>setIsCreateTask(true)} >
                            <FaPlus className={'icon-add'}/>
                            Thêm Công Việc
                        </button>
                    }
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
                <EditSprint sprint={sprint} onClose={()=>setShowEditSprint(false)} onSave={handleUpdateSprint} />
            </Modal>
            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Phiên <strong>${sprint.name}</strong>  ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setShowConfirmDelete(false)}
                          onOK={handleDelete}/>
        </div>
    );
}

export default SprintItemV2;