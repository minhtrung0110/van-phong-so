import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from "~/components/Client/Project/HeaderTask/HeaderTask";
import BoardBar from "~/components/Client/Project/BoardBar/BoardBar";
import BoardContent from "~/components/Client/Project/BoardContent/BoardContent";
import HeaderTask from "~/components/Client/Project/HeaderTask/HeaderTask";
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCreateProjectSelector} from "~/redux/selectors/task/taskSelector";
import AddProject from "~/components/Client/Project/Add";
import {initialData} from "~/asset/data/initalDataTask";
import {mapOrder} from "~/utils/sorts";
import backgroundImage from "~/asset/images/backgroundTask01.jpg"
import {setIsViewTimeline} from "~/redux/reducer/task/taskReducer";

ManageTaskPage.propTypes = {};

function ManageTaskPage(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState()
    const [currentProject, setCurrentProject] = useState('')
    const [filter, setFilter] = useState()
    const [search, setSearch] = useState()
    const isCreateProject = useSelector(isCreateProjectSelector)
    const dispatch=useDispatch()
    useEffect(() => {
        // console.log
        const boardFromDB = initialData.boards.find(board => board.id === 'kltn-01')
        if (boardFromDB) {
            setBoard(boardFromDB)
            // sort Column
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))

        }
        if(filter==='3'){
            dispatch(setIsViewTimeline(true))
        }
        else  dispatch(setIsViewTimeline(false))

    }, [currentProject, filter, search])
    return (

        <div className='trello-minhtrung-master' style={{ backgroundImage:`url(${backgroundImage})`}}>
            <HeaderTask onCurrentProject={setCurrentProject}/>
            <BoardBar boardName={board.name} onFilter={setFilter} onSearch={setSearch}/>
            <BoardContent board={board} onBoard={setBoard} columnData={columns}/>
        </div>
    );
}

export default ManageTaskPage;