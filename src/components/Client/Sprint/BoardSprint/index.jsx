import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {isViewTimelineSelector} from "~/redux/selectors/project/projectSelector";
import {applyDragSprint} from "~/utils/dragDrop";
import {Container, Draggable} from "react-smooth-dnd";
import SprintItemV2 from "~/components/Client/Sprint/test/SprinrItemV2";
import {conCatArrayInArray, remakeSprintFromSlide} from "~/utils/sorts";
import {flushSync} from "react-dom";
import './BoardSprint.scss'

BoardSprint.propTypes = {

};

function BoardSprint({board,onBoard,columnData,onEdit,  onDeleteTask,onUpdateTask,timeLine}) {
   // console.log(columnData)
    const [columns,setColumns] = useState(columnData)
    const [isOpenNewColForm,setIsOpenNewColForm]=useState(false)
    const [newColTitle,setNewColTitle]=useState('')
    //  console.log(columns)
    useEffect(()=>{
        setColumns(columnData)
    },[columnData])

    // const onSprintDrop=(dropResult)=>{
    //     let newSprints=[...columns]
    //     // set lai ccolumn
    //
    //     newSprints=applyDrag(newColumns,dropResult)
    //     let newBoard={...board}
    //     // cập nhật columnnOrder bang các id sau khi keo tha
    //     newBoard.columnOrder=newColumns.map(item=>item.id)
    //     newBoard.columns=newColumns
    //     setColumns(newColumns)
    //     onBoard(newBoard)
    //     // console.log(newColumns)
    //     // console.log(newBoard)
    // }
    // khi kéo thả project qua lai giua cac cột
    const onCardDropSprint = (columnId,dropResult) => {
        console.log( 'Dichuyen',dropResult)
        console.log('col -id:',columnId)
        console.log('Columns',columns)
        if(dropResult.removedIndex !=null || dropResult.addedIndex !=null)
        {
            let newColumns=[...columns]
            let currentColumn=newColumns.find((item=>item.id===columnId)) // là cái cột chô sẽ duoc chuyển vào
            const listCardSprint= conCatArrayInArray(currentColumn.columns);
           // console.log('ccheccked',listCardSprint)
            currentColumn.columns=remakeSprintFromSlide(applyDragSprint(listCardSprint, dropResult, currentColumn.id), currentColumn);
            console.log('Đang Tesst: ',currentColumn,newColumns)
           // currentColumn.cardOrder=currentColumn.cards.map(i=>i.id)
          flushSync(()=>setColumns(newColumns))
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
        newBoard.columns=newColumns
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
        newBoard.columns=newColumns

        onBoard(newBoard)
        //  console.log(newColUpdate)
    }
    return (
        <div>
            <Container
                orientation="vertical"
              //  onDrop={onSprintDrop}
                getChildPayload={index =>columns[index]}
             //   dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'sprint-drop-preview'
                }}
            >
                {
                    !!columns && columns.map((sprint,index)=> (
                        <Draggable
                            key={index}>
                            <SprintItemV2
                                sprint={sprint}
                                column={sprint}
                                onCardDrop={onCardDropSprint}
                                onUpdateColumn={handleUpdateColumn}
                                onDeleteTask={onDeleteTask}
                                onUpdateTask={onUpdateTask}
                                onEdit={onEdit}

                            />
                        </Draggable>

                    ))
                }
            </Container>
        </div>
    );
}

export default BoardSprint;