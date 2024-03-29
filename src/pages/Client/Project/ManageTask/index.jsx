import React, {useEffect, useRef, useState} from 'react';
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
import {useLocation, useNavigate} from "react-router-dom";
import {deleteSprint, editSprint, getListSprintByProjectId, getSprintById} from "~/api/Client/Sprint/sprintAPI";
import {message} from "antd";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import KanbanProject from "~/components/commoms/Skeleton/Kaban/KanbanProject";
import KanbanProjectSkeleton from "~/components/commoms/Skeleton/Kaban/KanbanProject";
import {getStaffsProjectById} from "~/api/Client/Project/projectAPI";
import {authorizationFeature} from "~/utils/authorizationUtils";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {deleteTask, editTask, getListTasksFilter} from "~/api/Client/Task/taskAPI";
import {config} from "~/config";

ManageTaskPage.propTypes = {};

function ManageTaskPage(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = React.useState(true);
    const [listMembers, setListMembers] = useState([])
    const [filter, setFilter] = useState({
        member:[],
        duration:[],
        priority:[],
    })

    const [isReset, setIsReset] = useState(Math.random())
    const [messageApi, contextHolder] = message.useMessage();
    const [search, setSearch] = useState()
    const [sprint, setSprint] = useState({})
    const userLogin = useSelector(getUserSelector)
    const createPermission = !isEmpty(userLogin) && authorizationFeature(userLogin.permission, 'Task', 'create')
    const editPermission = !isEmpty(userLogin) && authorizationFeature(userLogin.permission, 'Task', 'update')
    const deletePermission = !isEmpty(userLogin) && authorizationFeature(userLogin.permission, 'Task', 'delete')
    const dispatch = useDispatch()
    //const idProject=useSelector(keyProjectSelector)
    const navigation = useNavigate()
    const fetchDataMembers = async (id) => {
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
        const project = JSON.parse(localStorage.getItem('project'))

        async function fetchDataSprint() {
            const params = {
                sprint_id: project.currentSprint,
                assignee_employee_ids: filter.member,
                duration_complete: filter.duration==='is_duration_complete'?[]:filter.duration,
                board_column_id:9,
                priorities: filter.priority,
                task_title: filter.search,
                is_assignee: filter.member==='no_assign',
                is_duration_complete: filter.duration==='is_duration_complete'
            }
            if(filter.duration==='none_duration_complete') params.duration_complete=false
            if(filter.member==='no_assign') params.assignee_employee_ids=false
            console.log('Params',params)
            const respond = await getSprintById(params);
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
        fetchDataMembers(project.projectId)
        // return () => {
        //     isMountedRef.current = false;
        // };

    }, [filter,isReset])
    console.log('Filter:', filter)
    // useEffect(()=>{
    //     async function fetchListTaskFilter() {
    //         const project = JSON.parse(localStorage.getItem('project'))
    //         const params = {assignee_employee_id:filter.member,
    //
    //             project_id:project.projectId,
    //             sprint_id:project.currentSprint,};
    //         const respond = await getListTasksFilter(params);
    //         console.log('Data respond:', respond)
    //         if (respond.status === 401) {
    //             messageApi.open({
    //                 type: 'error',
    //                 content: respond.message,
    //                 duration: 1.3,
    //             });
    //             handleSetUnthorization();
    //             return false;
    //
    //         } else if (respond.status === 1) {
    //             setColumns(respond)
    //         } else {
    //             setColumns([])
    //             return false;
    //         }
    //         setLoading(false);
    //     }
    //     fetchListTaskFilter()
    //     console.log('Filter: ', filter)
    // },[ filter, search])
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
        navigation(config.routes.login)
    };
    const handleUpdateColumn = (value) => {
        // Create and Update:  API post Sprint to server
        console.log(value)
        // Delete Column : FE return a new Sprint, which  was deleted 1 column Status.
    }

    const handleDeleteTask = async (id) => {
        const response = await deleteTask(id);
        if (response.status === 1) {
            messageApi.open({
                type: 'success',
                content: response.message,
                duration: 1.3
            })
            setIsReset(Math.random())
        } else {
            messageApi.open({
                type: 'error',
                content: response.message,
                duration: 1.3
            })
        }
    }

    const handleUpdateTask = async (value) => {
        console.log('Update Task: ', value)
        const response = await editTask(value)
        if (response.status === 1) {
            setIsReset(Math.random())
        } else if (response === 401) {
            handleSetUnthorization()
        } else {
            messageApi.open({
                type: 'error',
                content: response.message,
                duration: 1.3
            })
        }


    }
    const handleDeleteSprint = async (item) => {
        console.log('Delete sprint:', item)
        const result = await deleteSprint(item.id);
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
        } else if (result.status === 0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.4,
            });
        }
    }
    const handleUpdateSprint = async (id, data) => {
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
                loading ? (<KanbanProjectSkeleton/>) : (
                    <div className='trello-minhtrung-master' style={{backgroundImage: `url(${backgroundImage})`}}>
                        {contextHolder}
                        <HeaderTask />
                        <BoardBar boardName={'Dự Án'} onFilter={setFilter}
                            //onCompleteSprint={handleUpdateSprint}
                                  members={listMembers}
                                  onDeleteSprint={handleDeleteSprint}
                                  sprint={sprint}
                                  onSearch={setSearch}/>
                        <BoardContent board={sprint} onBoard={handleUpdateColumn} columnData={columns}
                                      members={listMembers.members}
                                      onReset={setIsReset}
                                      onUpdateTask={handleUpdateTask} permission={{
                            createTask: createPermission,
                            editTask: editPermission,
                            deleteTask: deletePermission
                        }}
                                      onDeleteTask={handleDeleteTask}/>
                    </div>
                )
            }
        </>
    );
}

export default ManageTaskPage;