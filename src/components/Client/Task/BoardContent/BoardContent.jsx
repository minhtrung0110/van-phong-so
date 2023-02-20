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
import {Col, Modal, Row} from "antd";


function BoardContent() {
    const [board,setBoard]=useState({})
    const [columns,setColumns] = useState([])
    const [isOpenNewColForm,setIsOpenNewColForm]=useState(false)
    const [newColTitle,setNewColTitle]=useState('')


    const newColInputRef=useRef()
    useEffect(()=>{
        const boardFromDB=initialData.boards.find(board => board.id==='kltn-01')
        if(boardFromDB){
            setBoard(boardFromDB)
            // sort Column

            setColumns(mapOrder(boardFromDB.columns,boardFromDB.columnOrder,'id'))
        }
    },[       ])

    const onColumnDrop=(dropResult)=>{
        let newColumns=[...columns]
        // set lai ccolumn

        newColumns=applyDrag(newColumns,dropResult)
        let newBoard={...board}
        // cập nhật columnnOrder bang các id sau khi keo tha
        newBoard.columnOrder=newColumns.map(item=>item.id)
        newBoard.columns=newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        // console.log(newColumns)
        // console.log(newBoard)
    }
    // khi kéo thả task qua lai giua cac cột
    const onCardDrop = (columnId,dropResult) => {
        console.log( 'Dichuyen',dropResult)
        console.log('col -id:',columnId)
        console.log('Columns',columns)
        if(dropResult.removedIndex !=null || dropResult.addedIndex !=null)
        {
            let newColumns=[...columns]
            let currentColumn=newColumns.find((item=>item.id===columnId))

            currentColumn.cards=applyDrag(currentColumn.cards,dropResult,currentColumn.id)
            currentColumn.cardOrder=currentColumn.cards.map(i=>i.id)
            setColumns(newColumns)

        }
        // vấn de: khi kéo thả thì trường column_ID của task bi loi không thay dôi
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
        newBoard.columns=newColumns
        setColumns(newColumns)
        setBoard(newBoard)


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
        newBoard.columns=newColumns

        setBoard(newBoard)
      //  console.log(newColUpdate)
    }

    return (
        isEmpty(board)?(
            <NotFoundData/>
        ):(
            <div className="board-content ">
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
                                    column={col}
                                    onCardDrop={onCardDrop}
                                    onUpdateColumn={handleUpdateColumn}

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


            </div>
        )
    );
}

export default BoardContent;