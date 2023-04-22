import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from "~/components/Client/Sprint/HeaderTask/HeaderTask";
import BoardBar from "~/components/Client/Sprint/BoardBar/BoardBar";
import BoardContent from "~/components/Client/Sprint/BoardContent/BoardContent";
import HeaderTask from "~/components/Client/Sprint/HeaderTask/HeaderTask";
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCreateProjectSelector, keyProjectSelector} from "~/redux/selectors/project/projectSelector";
import {initialData} from "~/asset/data/initalDataTask";
import {getSprintActive, mapOrder} from "~/utils/sorts";
import backgroundImage from "~/asset/images/backgroundTask01.jpg"
import {setIsViewTimeline} from "~/redux/reducer/project/projectReducer";
import {flatten, isEmpty} from "lodash";
import {useLocation} from "react-router-dom";

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
    const location=useLocation()
    useEffect(() => {
        // console.log
       console.log('Call API get Project')
        const project=JSON.parse(localStorage.getItem('project'))

        const boardFromDB = initialData.boards.find(board => board.id === project.projectId)
        if (!isEmpty(boardFromDB)) {
            const currentSprint= boardFromDB.sprints.find(item=>item.id===project.currentSprint)//getSprintActive(boardFromDB.sprints);

            setBoard(boardFromDB)
            setSprint(currentSprint)
            console.log('SprintActive: ',currentSprint)
            setColumns(mapOrder(currentSprint.columns, currentSprint.columnOrder, 'id'))
            console.log('SprintActive: ',currentSprint)

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

    }, [currentProject, filter, search])
    const handleUpdateColumn = (value)=>{
        // Create and Update:  API post Sprint to server
        console.log(value)
        // Delete Column : FE return a new Sprint, which  was deleted 1 column Status.
    }
    const handleDeleteTask=(value)=>{
        console.log('Delete Task: ', value)
    }
    const handleUpdateTask=(value)=>{
        console.log('Update Task: ', value)
    }

    return (

        <div className='trello-minhtrung-master' style={{ backgroundImage:`url(${backgroundImage})`}}>
            <HeaderTask onCurrentProject={setCurrentProject}/>
            <BoardBar boardName={board.name} sprintName={sprint.name} onFilter={setFilter}  onSearch={setSearch}/>
            <BoardContent board={sprint} onBoard={handleUpdateColumn} columnData={columns}
                          onUpdateTask={handleUpdateTask}
                          onDeleteTask={handleDeleteTask} />
        </div>
    );
}

export default ManageTaskPage;