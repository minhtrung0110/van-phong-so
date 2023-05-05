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

function BoardSprint({project,columnData,onEdit, onDelete,onCreateTask, onDeleteTask,onUpdateTask}) {
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
            let currentColumn=newColumns.find((item=>item.id===columnId)) // là cái sprint chô sẽ duoc chuyển vào
            const listCardSprint=currentColumn.tasks// conCatArrayInArray(currentColumn.columns);
           // console.log('ccheccked',listCardSprint)
            console.log('Đang Tesst: ',currentColumn,newColumns)
            currentColumn.tasks=applyDragSprint(currentColumn.tasks, dropResult, currentColumn.id);

           // currentColumn.cardOrder=currentColumn.cards.map(i=>i.id)
          flushSync(()=>setColumns(newColumns))
        }
       // vấn de: khi kéo thả thì trường column_ID của project bi loi không thay dôi
    }
    console.log(columns)

    return (
        <div>
            <Container
                orientation="vertical"
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
                                onEdit={onEdit}
                                onDelete={onDelete}
                                listStatus={project.board_columns}
                                onCreateTask={onCreateTask}
                                onDeleteTask={onDeleteTask}
                                onUpdateTask={onUpdateTask}

                            />
                        </Draggable>

                    ))
                }
            </Container>
        </div>
    );
}

export default BoardSprint;