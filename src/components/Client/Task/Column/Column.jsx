import React, {useEffect, useRef, useState} from 'react';
import "./Column.scss";
import {Container, Draggable} from "react-smooth-dnd";
import {FaEllipsisH, FaExclamationTriangle, FaPlus, FaTimes} from "react-icons/fa";
import {Button, ButtonGroup} from "react-bootstrap";
import {cloneDeep} from "lodash";
import {mapOrder} from "~/utils/sorts";
import {Dropdown, Input, Form, Modal, message} from "antd";
import Card from "~/components/Client/Task/Card/TaskItem";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import TextArea from "antd/es/input/TextArea";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import DetailTask from "~/components/Client/Task/DetailTask";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {useSelector} from "react-redux";
import { projectSelector} from "~/redux/selectors/project/projectSelector";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {createTask} from "~/api/Client/Task/taskAPI";


function Column({sprint,column,onResetData, onCardDrop,members, onUpdateColumn,onDeleteTask,onUpdateTask,permission}) {
   // console.log('Permission Column:',permission)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState(column.name)
    const [isAddCard, setIsAddCard] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [valueNewCard, setValueNewCard] = useState('')
    const [isOpenDetailTask,setIsOpenDetailTask]=useState(false)
    const [taskUpdate, setTaskUpdate] = useState({})
    const project=useSelector(projectSelector)
    const userLogin=useSelector(getUserSelector)
  //  console.log(project)
    const newCardRef = useRef()
    useEffect(() => {
        setColumnTitle(column.name)
    }, [column.name])
    const cards = column.tasks;//mapOrder(column.cards, column.cardOrder, 'id')
    const handleRemoveColumn = () => {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
            setShowConfirmModal(false);
    }
    const selectAllInlineTex = (e) => {
        e.target.focus();
       // e.target.select()
    }
    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)

    }
    const handleAddCard = async () => {
        const length=column.tasks.length;
        const newValueSortTask=column.tasks[length-1].sort
        const newCardToAdd = {
            sprint_id: sprint.id,
            project_id: sprint.project_id,
            board_column_id: column.id,
            assignee_employee_id: null,
            report_employee_id: userLogin.id,
            title: valueNewCard,
            start_time: new Date(),
            end_time:   new Date(),
            description: "",
            priority: 4,
            subtasks: [],
            attachments: [],
            comments: [],
            estimate_point: 3,
            status: 1,
            sort: newValueSortTask+1,
        }
        console.log(newCardToAdd)
        const result = await createTask(newCardToAdd)
        if (result.status === 1) {
            let newColumn = cloneDeep(column)
            newColumn.tasks.push(newCardToAdd)
            /// newColumn.cardOrder.push(newCardToAdd.id)
            // truyền lên board Content
            onUpdateColumn(newColumn)
            // clear up
            setValueNewCard('')
            setIsAddCard(false)
           // onResetData(Math.random() )
            // onCreateTask(newCardToAdd)
        } else {
            messageApi.open({
                type: 'error',
                message: result.message,
                duration: 1.3,
            })
            setValueNewCard('')
            setIsAddCard(false)

        }
    }
    const handleDuplicateTask = async (task) => {
        const length = column.tasks.length;
        const newValueSortTask = column.tasks[length - 1].sort
        //console.log('Sao chep card:',length,column.tasks,{...task,sort: newValueSortTask+1,report_employee_id: userLogin.id,})
        const newCardToAdd={...task,sort: newValueSortTask+1,report_employee_id: userLogin.id,}
        const result = await createTask(newCardToAdd)
        if (result.status === 1) {
            let newColumn = cloneDeep(column)
            newColumn.tasks.push(newCardToAdd)
            /// newColumn.cardOrder.push(newCardToAdd.id)
            // truyền lên board Content
            onUpdateColumn(newColumn)
            // clear up
            setValueNewCard('')
            setIsAddCard(false)
            // onResetData(Math.random() )
            // onCreateTask(newCardToAdd)
        } else {
            messageApi.open({
                type: 'error',
                message: result.message,
                duration: 1.3,
            })
            setValueNewCard('')
            setIsAddCard(false)
        }
    }
    const items = [
        {
            label: 'Xóa Cột',
            key: '1',
        },

    ];
    const [open, setOpen] = useState(false);
    const handleMenuClick = (e) => {
        if (e.key === '1') {
            setOpen(false);
            setShowConfirmModal(true)
        }
        else if (e.key === '3') {
            setOpen(false);
        }
        else {

        }
    };
    const handleOpenChange = (flag) => {
        setOpen(flag);
    }
    const handleShowDetailTask=(value) => {
        setIsOpenDetailTask(value);

    }
    const handleUpdateTask=(value) => {
        console.log(value)
    }
    const myFormRef = useRef(null); // khởi tạo ref

    const handleCancel = () => {
        // Truy cập dữ liệu từ form thông qua ref
        // const formValues = myFormRef.current.getFieldsValue();
        // console.log(formValues);

        // Gọi hàm onCancel
        setShowConfirmModal(false)
       // onCancel();
    };

    const handleSubmit = () => {
        const formValues = myFormRef.current.getFieldsValue();
        console.log(formValues);

        // Thực hiện xử lý khi form được submit
        // ...
    };
    const handleCloseDetailTask=() => {
        setIsOpenDetailTask(false)
        onUpdateTask(taskUpdate)
    }
    const handleDeleteTask=(id) => {
        setIsOpenDetailTask(false)
        onDeleteTask(id)
    }
    return (
        <div className="column">

            <header className='header-title column-drag-handle '>
                <Input
                    size='middle'
                    type='text'
                    placeholder='Điền tên côt'
                    className='minhtrung-content-editable input-header'
                    value={columnTitle}
                    spellCheck={false}
                    onChange={(e) => setColumnTitle(e.target.value)}
                    onClick={selectAllInlineTex}
                    onBlur={handleColumnTitleBlur}
                    onMouseDown={e => e.preventDefault()}
                    onKeyDown={event => (event.key === 'Enter') && handleColumnTitleBlur()}
                />
                <Dropdown
                    className='dropdown-btn'
                    menu={{
                        items,
                        onClick: handleMenuClick,
                    }}
                    onOpenChange={handleOpenChange}
                    open={open}
                    placement="bottomRight"
                    overlayStyle={{
                        padding: '0',
                        margin: '0',
                    }}
                    overlayClassName='overlay-more'
                >
                    <div>
                        <FaEllipsisH className='dot'/>
                    </div>
                </Dropdown>
            </header>
            <div className='card-list'>
                <Container
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    // onDragEnter={() => {
                    //     console.log("drag enter:", column.id);
                    // }}
                    // onDragLeave={() => {
                    //     console.log("drag leave:", column.id);
                    // }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
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
                        !!column.tasks && column.tasks.map((item, index) => (
                            <Draggable key={index}>
                                <TaskItem task={item} onShowDetail={handleShowDetailTask} permission={permission} />
                            </Draggable>

                        ))
                    }
                </Container>
            </div>
            {
                isAddCard && (
                    <div className='add-new-card-area'>
                        <TextArea rows={3}
                                  placeholder='Nhập công việc'
                                  className='input-enter-card'
                                  value={valueNewCard}
                                  onChange={e => setValueNewCard(e.target.value)}
                                  ref={newCardRef}
                                  onKeyDown={event => (event.key === 'Enter') && handleAddCard()}
                        />


                        <div className='box-btn'>
                            <button className='btn-outline-primary btn-add-task'
                                    onClick={handleAddCard}
                            >Add</button>
                            <FaTimes className='cancel-new-card'
                                     onClick={() => setIsAddCard(false)}
                            />
                        </div>
                    </div>
                )
            }

                    <footer className='footer-column'>
                        {
                        (permission.createTask && !isAddCard) && (
                      <div className='add-card-task'  onClick={() => setIsAddCard(true)}>
                          <FaPlus className='footer-icon'/> Thêm Công Việc
                      </div>)}
                    </footer>


            {/*<ConfirmModal*/}
            {/*    show={showConfirmModal}*/}
            {/*    title='Remove Column'*/}
            {/*    content={`Are you sure you want to remove columns ${column.title} ?`}*/}
            {/*    onAction={handleRemoveColumn} />*/}
            <Modal
                title=""
                onCancel={handleCloseDetailTask}
                footer={null}
                width={800}
                style={{ top: 80 }}
                open={isOpenDetailTask}
                destroyOnClose={true}
               // afterClose={()=>handleUpdateTask}
            >
              <DetailTask isOpen={isOpenDetailTask} column={column}   listMembers={members} sprint={sprint}
                          onDeleteTask={handleDeleteTask} onUpdateTask={setTaskUpdate} onDuplicate={handleDuplicateTask}/>
            </Modal>
            <ConfirmModal open={showConfirmModal} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html:`Bạn Có Thực Sự Muốn Xóa Cột <strong>${columnTitle}</strong> Này ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={()=>setShowConfirmModal(false)} onOK={handleRemoveColumn}/>
        </div>
    );
}

export default Column;