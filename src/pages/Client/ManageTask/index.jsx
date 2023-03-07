import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from "~/components/Client/Project/HeaderTask/HeaderTask";
import BoardBar from "~/components/Client/Project/BoardBar/BoardBar";
import BoardContent from "~/components/Client/Project/BoardContent/BoardContent";
import HeaderTask from "~/components/Client/Project/HeaderTask/HeaderTask";
import './style.scss'
import {useSelector} from "react-redux";
import {isCreateProjectSelector} from "~/redux/selectors/task/taskSelector";
import AddProject from "~/components/Client/Project/Add";
import {initialData} from "~/asset/data/initalDataTask";
import {mapOrder} from "~/utils/sorts";

ManageTaskPage.propTypes = {};

function ManageTaskPage(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState()
    const [currentProject, setCurrentProject] = useState('')
    const [filter, setFilter] = useState()
    const [search, setSearch] = useState()
    const isCreateProject = useSelector(isCreateProjectSelector)

    useEffect(() => {
        // console.log
        const boardFromDB = initialData.boards.find(board => board.id === 'kltn-01')
        if (boardFromDB) {
            setBoard(boardFromDB)
            // sort Column
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))

        }
    }, [currentProject, filter, search])
    return (

        <div className='trello-minhtrung-master'>
            <HeaderTask onCurrentProject={setCurrentProject}/>
            <BoardBar boardName={board.name} onFilter={setFilter} onSearch={setSearch}/>
            <BoardContent board={board} onBoard={setBoard} columnData={columns}/>
        </div>
    );
}

export default ManageTaskPage;