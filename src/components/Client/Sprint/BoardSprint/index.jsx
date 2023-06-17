import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {isViewTimelineSelector} from "~/redux/selectors/project/projectSelector";
import {applyDragSprint} from "~/utils/dragDrop";
import {Container, Draggable} from "react-smooth-dnd";
import SprintItemV2 from "~/components/Client/Sprint/test/SprinrItemV2";
import {conCatArrayInArray, remakeSprintFromSlide} from "~/utils/sorts";
import {flushSync} from "react-dom";
import './BoardSprint.scss'
import NotFoundData from "~/components/commoms/NotFoundData";
import {dragAndDropTask} from "~/api/Client/Task/taskAPI";

BoardSprint.propTypes = {};

function BoardSprint({project,permission, columnData, onEdit, onDelete,onComplete, onCreateTask, onDeleteTask, onUpdateTask,members}) {
    //console.log('columnData',columnData)
    const [columns, setColumns] = useState(columnData)
    const [isOpenNewColForm, setIsOpenNewColForm] = useState(false)
    const [newColTitle, setNewColTitle] = useState('')
    //console.log(columns)
    useEffect(() => {
        setColumns(columnData)
    }, [columnData])

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
    const handleSwitchTask=async (sort,id,sprintID) => {
        const result = await dragAndDropTask({
            sort: sort+1,
            sprint_id: sprintID,
            task_id: id
        })
        console.log('Ket qua keo tha:',result  )
        // console.log('Keo Tha:',{
        //     sort: dropResult.addedIndex,
        //     sprint_id: dropResult.payload.sprint_id,
        //     task_id: dropResult.payload.id,
        // })
    }
    const onCardDropSprint = (columnId, dropResult) => {
        console.log('Dichuyen', dropResult)
        console.log('col -id:', columnId)
        console.log('Columns', columns)
        if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find((item => item.id === columnId)) // là cái sprint chô sẽ duoc chuyển vào
            const listCardSprint = currentColumn.tasks// conCatArrayInArray(currentColumn.columns);
            // console.log('ccheccked',listCardSprint)
            if(dropResult.addedIndex!==null && dropResult.removedIndex!==null){
                    handleSwitchTask(dropResult.addedIndex,dropResult.payload.id,dropResult.payload.sprint_id)
                console.log('Di chuyen trong Sprint add:',dropResult.addedIndex,'remove',dropResult.removedIndex)
            }
            else {
                if(dropResult.addedIndex!==null){
                    handleSwitchTask(dropResult.addedIndex,dropResult.payload.id,columnId)
                    console.log('Keo tha sang Sprint mới add:',dropResult.addedIndex,'remove',dropResult.removedIndex)
                }

            }
           // console.log('Đang Tesst: ', currentColumn, newColumns)
            currentColumn.tasks = applyDragSprint(currentColumn.tasks, dropResult, currentColumn.id);

            // currentColumn.cardOrder=currentColumn.cards.map(i=>i.id)
            flushSync(() => setColumns(newColumns))
        }
        // vấn de: khi kéo thả thì trường column_ID của project bi loi không thay dôi
    }
    // console.log(columns)

    return (
        <div>
            <Container
                orientation="vertical"
                getChildPayload={index => columns[index]}
                //   dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'sprint-drop-preview'
                }}
            >
                {
                    columns.length > 0 ? (columns.map((sprint, index) => sprint.status < 2 && (
                            <Draggable
                                key={index}>
                                <SprintItemV2
                                    backlogId={1}
                                    sprint={sprint}
                                    permission={permission}
                                    column={sprint}
                                    onCardDrop={onCardDropSprint}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onComplete={onComplete}
                                    listStatus={sprint.board_columns}
                                    onCreateTask={onCreateTask}
                                    onDeleteTask={onDeleteTask}
                                    onUpdateTask={onUpdateTask}

                                />
                            </Draggable>
                        )
                    )) : (
                        <NotFoundData/>
                    )

                }
            </Container>
        </div>
    );
}

export default BoardSprint;