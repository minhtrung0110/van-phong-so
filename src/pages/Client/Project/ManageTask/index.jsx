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
import {editSprint, getListSprintByProjectId, getSprintById} from "~/api/Client/Sprint/sprintAPI";
import {message} from "antd";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import KanbanProject from "~/components/commoms/Skeleton/Kaban/KanbanProject";
import KanbanProjectSkeleton from "~/components/commoms/Skeleton/Kaban/KanbanProject";
import {getStaffsProjectById} from "~/api/Client/Project/projectAPI";

ManageTaskPage.propTypes = {};

function ManageTaskPage(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = React.useState(true);
    const [listMembers, setListMembers] = useState([])
    const [currentProject, setCurrentProject] = useState('')
    const [filter, setFilter] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const [search, setSearch] = useState()
    const [sprint,setSprint] = useState({})
    const isCreateProject = useSelector(isCreateProjectSelector)

    const dispatch=useDispatch()
    const idProject=useSelector(keyProjectSelector)
    const location=useLocation()
    const fetchDataMembers=async (id) => {
        const respond = await getStaffsProjectById(id)
        if (respond.status === 401) {
            messageApi.open({
                type: 'error',
                content: respond.message,
                duration: 1.3,
            });
            handleSetUnthorization();
            return false;

        } else if (respond.status === 1) {
            setListMembers(respond.data);
        } else {
            setListMembers([])
            return false;
        }
        setLoading(false);
    }
    useEffect(() => {
        const project=JSON.parse(localStorage.getItem('project'))
        async function fetchDataSprint() {
            // let params = {};
            // // if (filter.status !== 'all' || filter.role!=='all') params = { ...params, filter };
            // if (search !== '') params = { ...params, search };
            const respond = await getSprintById(2);
            console.log('Data respond:', respond)
            if (respond.status === 401) {
                messageApi.open({
                    type: 'error',
                    content: respond.message,
                    duration: 1.3,
                });
                handleSetUnthorization();
                return false;

            } else if (respond.status === 1) {
                setSprint(respond.data);
                setColumns(respond.data.board_columns)
            } else {
                setSprint({})
                return false;
            }
            setLoading(false);
        }
        fetchDataSprint();
        fetchDataMembers(1)

        // const boardFromDB = initialData.boards.find(board => board.id === project.projectId)
        // if (!isEmpty(boardFromDB)) {
        //     let currentSprint= boardFromDB.sprints.find(item=>item.id===project.currentSprint)//getSprintActive(boardFromDB.sprints);
        //
        //     setBoard(boardFromDB)
        //     setSprint(currentSprint)
        //     console.log('SprintActive: ',currentSprint)
        //     setColumns(mapOrder([...currentSprint.columns], currentSprint.columnOrder, 'id'))
        //     console.log('SprintActive: ',currentSprint)

        // const data=   boardFromDB.columns.map((column) =>{
        //   return  column.cards.map((card)=>({id:card.id,title:card.title,endTime:card.endTime}))
        //
        //  //   setTimeLine(prev=>[...prev,...data])
        //   //  console.log(timeLine)
        // })
        // const flattenedArr = data.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
        // console.log(flattenedArr )

        // sort Column
        //
        //
        //
        // }
        // if(filter==='3'){
        //     dispatch(setIsViewTimeline(true))
        // }
        // else  dispatch(setIsViewTimeline(false))

    }, [currentProject, filter, search])
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
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
    const handleUpdateSprint=async (id,data) => {
        console.log('Update Sprint: ', id, data)
        const result = await editSprint(id, data);
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            // dispatch(setIsResetSprint(true))
        } else if (result.status === 0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.4,
            });
        }
    }
    return (

        <>
            {
                loading ? (<KanbanProjectSkeleton />):(
                    <div className='trello-minhtrung-master' style={{ backgroundImage:`url(${backgroundImage})`}}>
                        {contextHolder}
                        <HeaderTask onCurrentProject={setCurrentProject}/>
                        <BoardBar boardName={'Dự Án'}  onFilter={setFilter}
                                  onCompleteSprint={handleUpdateSprint}
                                  members={listMembers}
                                  sprint={sprint}
                                  onSearch={setSearch}/>
                        <BoardContent board={sprint} onBoard={handleUpdateColumn} columnData={columns}
                                      onUpdateTask={handleUpdateTask}
                                      onDeleteTask={handleDeleteTask} />
                    </div>
                )
            }
        </>
    );
}

export default ManageTaskPage;