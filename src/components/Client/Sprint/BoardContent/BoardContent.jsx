import React, {useEffect, useRef, useState} from 'react'
import "./BoardContent.scss"

import { Container, Draggable } from "react-smooth-dnd";
import {FaCross, FaPlus, FaTerminal, FaTimes, FaTimesCircle} from "react-icons/fa";
import {mapOrder} from "~/utils/sorts";
import {applyDrag} from "~/utils/dragDrop";
import {initialData} from "~/asset/data/initalDataTask";
import Column from "~/components/Client/Task/Column/Column";
import {isEmpty} from "lodash";
import NotFoundData from "~/components/commoms/NotFoundData";
import TextArea from "antd/es/input/TextArea";
import {Badge, Calendar, Col, message, Modal, Row} from "antd";
import {useSelector} from "react-redux";
import {deleteTaskSelector, isViewTimelineSelector} from "~/redux/selectors/project/projectSelector";
import column from "~/components/Client/Task/Column/Column";
import dayjs from "dayjs";
import TimeLine from "~/components/Client/Sprint/TimeLine";
import {dragAndDropTask} from "~/api/Client/Task/taskAPI";


function BoardContent({board,onBoard,columnData,onDeleteTask,onUpdateTask,timeLine,permission}) {
   // console.log({board,onBoard,columnData})
   // console.log('rendering')
    const [columns,setColumns] = useState(columnData)
    const [isOpenNewColForm,setIsOpenNewColForm]=useState(false)
    const [newColTitle,setNewColTitle]=useState('')
    const [messageApi, contextHolder] = message.useMessage();
  //  console.log(columns)
    const newColInputRef=useRef()
        const isViewTimeLine=useSelector(isViewTimelineSelector)
    useEffect(()=>{
      setColumns(columnData)
    },[columnData])

    const onColumnDrop=(dropResult)=>{
        let newColumns=[...columns]
        // set lai ccolumn

        newColumns=applyDrag(newColumns,dropResult)
        let newBoard={...board}
        // cập nhật columnnOrder bang các id sau khi keo tha
       // newBoard.columnOrder=newColumns.map(item=>item.id)
        newBoard.board_columns=newColumns
        console.log('neww_Columns',newColumns)
        setColumns(newColumns)
        onBoard(newBoard)
        // console.log(newColumns)
        // console.log(newBoard)
    }
    // khi kéo thả project qua lai giua cac cột
    const updateStatusTask=async (body) => {
        const result = await dragAndDropTask(body)
        return result.status === 1;
    }
    const onCardDrop = (columnId,dropResult) => {
        console.log( 'Dichuyen',dropResult)
        console.log('col -id:',columnId)
        console.log('Columns',columns)
        if(dropResult.removedIndex !=null || dropResult.addedIndex !=null) /// Drop lần 2 lần thả vào column
        {
            let taskDrop= {
                task_id: dropResult.payload.id,
                new_index: dropResult.addedIndex,
                new_boardcolumn: columnId,
            }
            console.log('Object PPut API',taskDrop)
            // if(updateStatusTask(taskDrop)){
                let newColumns=[...columns]
                let currentColumn=newColumns.find((item=>item.id===columnId))
                console.log('New column:',newColumns,currentColumn)
                currentColumn.tasks=applyDrag(currentColumn.tasks,dropResult,currentColumn.id)
                // currentColumn.cardOrder=currentColumn.tasks.map(i=>i.id)
                setColumns(newColumns)
            // }else{
            //     messageApi.open({
            //         type:'error',
            //         message:'Phát hiện lỗi',
            //         duration:1.2
            //         }
            //     )
            // }
        }
        // vấn de: khi kéo thả thì trường column_ID của project bi loi không thay dôi
    }
    const handleAddNewColumn=()=>{
        //    newColInputRef.current.focus();
        const newColumnToAdd={
            id:Math.random().toString(36).substr(2,5),
            boardId:board.id,
            title:newColTitle.trim(),
            cardOrder:[],
            cards:[]
        }
        let newColumns=[...columns]
        newColumns.push(newColumnToAdd)
      //  console.log(newColumns)
        let newBoard={...board}
        // cập nhật columnnOrder bang các id sau khi keo tha
        newBoard.columnOrder=newColumns.map(item=>item.id)
        newBoard.board_columns=newColumns
        setColumns(newColumns)
        onBoard(newBoard)


        //clear inout
        setNewColTitle('')
        setIsOpenNewColForm(false)


    }

    const handleUpdateColumn=(newColUpdate)=>{
        const columnIdToUpdate=newColUpdate.id
        let newColumns=[...columns]
        const columnIndexToUpdate=newColumns.findIndex(i=>i.id===newColUpdate.id)
        //console.log('xóa ở: ',columnIndexToUpdate)
        if(newColUpdate._destroy){
            newColumns.splice(columnIndexToUpdate,1)
            setColumns(newColumns)
        }else{
            newColumns.splice(columnIndexToUpdate,1,newColUpdate)
            setColumns(newColumns)
        }

        // console.log(columns)
        let newBoard={...board}
        newBoard.columnOrder=newColumns.map(item=>item.id)
        newBoard.board_columns=newColumns

        onBoard(newBoard)
      //  console.log(newColUpdate)
    }




    return (
        isEmpty(board)?(
            <NotFoundData/>
        ):(
            <div className="board-content ">
                {
                    !isViewTimeLine ? (<>
                        <Container
                            orientation="horizontal"
                            onDrop={onColumnDrop}
                            getChildPayload={index =>columns[index]}
                            dragHandleSelector=".column-drag-handle"
                            dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'column-drop-preview'
                            }}
                        >
                            {
                                !!columns && columns.map((col,index)=> (
                                    <Draggable

                                        key={index}>
                                        <Column
                                            sprint={board}
                                            column={col}
                                            onCardDrop={onCardDrop}
                                            onUpdateColumn={handleUpdateColumn}
                                            onDeleteTask={onDeleteTask}
                                            onUpdateTask={onUpdateTask}
                                            permission={permission}

                                        />
                                    </Draggable>

                                ))
                            }
                        </Container>
                        <div className='trello-minhtrung-container'  >
                            {!isOpenNewColForm && (
                                <Row>
                                    <Col className='add-new-column'
                                         onClick={()=>{
                                             setIsOpenNewColForm(true)

                                         }}
                                    >
                                        <FaPlus className='icon-add' />   Tạo Mới
                                    </Col>
                                </Row>
                            )}
                            {
                                !!isOpenNewColForm  && ( <Row>
                                    <Col className='enter-new-column'>
                                        <TextArea
                                            size='middle'
                                            type='text'
                                            placeholder='Tạo Mới'
                                            className='input-enter-new-column '
                                            value={newColTitle}
                                            onChange={e=>setNewColTitle(e.target.value)}
                                            ref={newColInputRef}
                                            onKeyDown={event => (event.key==='Enter')&& handleAddNewColumn()}
                                        />
                                        <div className='ft-btn'>
                                            <button className='btn-outline-success btn-add-new-column'
                                                    onClick={handleAddNewColumn}
                                            >Tạo</button>
                                            <FaTimes className='cancel-new-column'
                                                     onClick={()=>setIsOpenNewColForm(false)}
                                            />
                                        </div>

                                    </Col>
                                </Row>)
                            }
                        </div>
                    </>):(
                      <TimeLine board={board} />
                    )
                }



            </div>
        )
    );
}

export default BoardContent;