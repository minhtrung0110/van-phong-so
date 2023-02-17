import React, {useEffect, useRef, useState} from 'react';
import "./Column.scss";
import {Container, Draggable} from "react-smooth-dnd";
import {FaEllipsisH, FaPlus, FaTimes} from "react-icons/fa";
import {Button, ButtonGroup} from "react-bootstrap";
import {cloneDeep} from "lodash";
import {mapOrder} from "~/utils/sorts";
import {Dropdown, Input, Form, Modal} from "antd";
import Card from "~/components/Client/Task/Card/TaskItem";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import TextArea from "antd/es/input/TextArea";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import DetailTask from "~/components/Client/Task/DetailTask";


function Column({column, onCardDrop, onUpdateColumn}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')
    const [isAddCard, setIsAddCard] = useState(false)
    const [valueNewCard, setValueNewCard] = useState('')
    const [isOpenDetailTask,setIsOpenDetailTask]=useState(false)
    const [detailTask, setDetailTask] = useState()
    const newCardRef = useRef()
    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const handleRemoveColumn = (type) => {
        (type === 'close') && setShowConfirmModal(false);
        if (type === 'confirm') {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
            setShowConfirmModal(false);
        }
    }
    const selectAllInlineTex = (e) => {
        e.target.focus();
        e.target.select()
    }
    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }
    const handleAddCard = () => {
        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: column.boardId,
            columnId: column.id,
            title: valueNewCard,
            cover: null
        }
        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd.id)
        // truyền lên board Content
        onUpdateColumn(newColumn)

        // clear up
        setValueNewCard('')
        setIsAddCard(false)

    }
    const items = [
        {
            label: 'Xóa Cột',
            key: '1',
        },
        {
            label: 'Lọc',
            key: '2',
        },
        {
            label: 'Sắp xếp',
            key: '3',
        }
    ];
    const [open, setOpen] = useState(false);
    const handleMenuClick = (e) => {
        if (e.key === '3') {
            setOpen(false);
        }
    };
    const handleOpenChange = (flag) => {
        setOpen(flag);
    }
    const handleShowDetailTask=(value) => {
        setIsOpenDetailTask(value);

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
                        !!column.cards && column.cards.map((item, index) => (
                            <Draggable key={index}>
                                <TaskItem task={item} onShowDetail={handleShowDetailTask}/>
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
            {
                !isAddCard && (
                    <footer className='footer-column'>
                      <div className='add-card-task'  onClick={() => setIsAddCard(true)}>
                          <FaPlus className='footer-icon'/> Thêm Công Việc
                      </div>
                    </footer>
                )
            }

            {/*<ConfirmModal*/}
            {/*    show={showConfirmModal}*/}
            {/*    title='Remove Column'*/}
            {/*    content={`Are you sure you want to remove columns ${column.title} ?`}*/}
            {/*    onAction={handleRemoveColumn} />*/}
            <Modal
                title=""
                onCancel={()=>setIsOpenDetailTask(false)}
                footer={null}
                width={800}
                style={{ top: 80 }}
                open={isOpenDetailTask}
            >
              <DetailTask/>
            </Modal>
        </div>
    );
}

export default Column;