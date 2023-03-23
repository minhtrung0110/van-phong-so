import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from "~/components/Client/Project/HeaderTask/HeaderTask";
import BoardBar from "~/components/Client/Project/BoardBar/BoardBar";
import BoardContent from "~/components/Client/Project/BoardContent/BoardContent";
import HeaderTask from "~/components/Client/Project/HeaderTask/HeaderTask";
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCreateProjectSelector, keyProjectSelector} from "~/redux/selectors/project/projectSelector";
import AddProject from "~/components/Client/Project/Add";
import {initialData} from "~/asset/data/initalDataTask";
import {getSprintActive, mapOrder} from "~/utils/sorts";
import backgroundImage from "~/asset/images/backgroundTask01.jpg"
import {setIsViewTimeline} from "~/redux/reducer/project/projectReducer";
import {flatten} from "lodash";

ManageTaskPage.propTypes = {};

function ManageTaskPage(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [currentProject, setCurrentProject] = useState('')
    const [filter, setFilter] = useState()
    const [search, setSearch] = useState()
    const [sprint,setSprint] = useState({})
    const isCreateProject = useSelector(isCreateProjectSelector)

    const dispatch=useDispatch()
    const idProject=useSelector(keyProjectSelector)
    useEffect(() => {
        // console.log
       // console.log('Call API get Project')
        const boardFromDB = initialData.boards.find(board => board.id === 'kltn-01')
        console.log(boardFromDB.sprints)
        if (boardFromDB) {
            const currentSprint=getSprintActive(boardFromDB.sprints);
            setBoard(boardFromDB)
            setSprint(currentSprint)
            setColumns(mapOrder(currentSprint.columns, currentSprint.columnOrder, 'id'))


            // const data=   boardFromDB.columns.map((column) =>{
            //   return  column.cards.map((card)=>({id:card.id,title:card.title,endTime:card.endTime}))
            //
            //  //   setTimeLine(prev=>[...prev,...data])
            //   //  console.log(timeLine)
            // })
            // const flattenedArr = data.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
            // console.log(flattenedArr )

            // sort Column



        }
        if(filter==='3'){
            dispatch(setIsViewTimeline(true))
        }
        else  dispatch(setIsViewTimeline(false))
        console.log(filter)
    }, [idProject,currentProject, filter, search])
    return (

        <div className='trello-minhtrung-master' style={{ backgroundImage:`url(${backgroundImage})`}}>
            <HeaderTask onCurrentProject={setCurrentProject}/>
            <BoardBar boardName={board.name} sprintName={sprint.name} onFilter={setFilter}  onSearch={setSearch}/>
            <BoardContent board={sprint} onBoard={setSprint} columnData={columns} />
        </div>
    );
}

export default ManageTaskPage;