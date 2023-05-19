import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import SprintItem from "~/components/Client/Sprint/SprintItem";
import {FaAngleDown, FaEllipsisH, FaList, FaPlus, FaTimes} from "react-icons/fa";
import FilterProject from "~/components/commoms/FilterProject";
import {initialData, listMembersForTask} from "~/asset/data/initalDataTask";
import {Breadcrumb, Modal, message, Dropdown} from "antd";
import AddSprint from "~/components/Client/Sprint/AddSprint";
import {NavLink} from "react-router-dom";
import {config} from "~/config";
import {useDispatch, useSelector} from "react-redux";
import {conCatArrayInArray, getTotalTaskInColumn} from "~/utils/sorts";
import TaskItem from "~/components/Client/Task/Card/TaskItem";
import TextArea from "antd/es/input/TextArea";

import BoardSprint from "~/components/Client/Sprint/BoardSprint";
import {boardSelector, isResetSprintSelector} from "~/redux/selectors/project/projectSelector";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import ListPageSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {createSprint, deleteSprint, editSprint, getListSprintByProjectId} from "~/api/Client/Sprint/sprintAPI";
import {setIsResetSprint, setMembers} from "~/redux/reducer/project/projectReducer";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import ListSprint from "~/components/commoms/Skeleton/Project/Sprint";
import ListSprintSkeleton from "~/components/commoms/Skeleton/Project/Sprint";


BacklogPage.propTypes = {};
const data = [
    {
        id: 1,
        name: 'Sprint 1',
        description: 'Sprint to display',
        startTime: '18/03/2023 00:10:00',
        endTime: '18/04/2023 23:10:00',
        listTasks: [   {
            id:'project-1',
            boardId  :'kltn-01',
            columnId: 'column-3',
            title:'UI Login',
            description: '',
            startTime:'01/01/2023 00:10:00',
            endTime:'11/03/2023 21:00:00',
            priority:'highly',
            members:[  {
                id: 1,
                first_name: 'Nguyễn Đức Minh',
                last_name: 'Trung',
                phone_number: '09744148784',
                gender: 'nam',
                birth_date: '01-10-2001',
                mail: 'minhtrung@gmail.com',
                role: 'CEO',
                avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                address: 'Tan Quy Tây, Bình Chanh,HCM',
                status: 1,
            }],
            todoList:[],
            fileList:[],
            comments:[],
        },
            {
                id:'project-2',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'UIBase DashBoard',
                description: '',
                startTime:'01/01/2023 00:10:00',
                endTime:'20/03/2023 21:00:00',
                priority:'highly',
                members:[
                    {
                        id: 2,
                        first_name: 'Dương Đình Khả',
                        last_name: 'Ngân',
                        phone_number: '08844148784',
                        gender: 'nữ',
                        birth_date: '12-06-1996',
                        mail: 'nganxulaku@gmail.com',
                        role: 'diễn viên',
                        avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
                        address: 'HCM',
                        status: 1,
                    }],
                todoList:[],
                fileList:[],
                comments:[],
            }
            ,  {
                id:'project-3',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'Đề Cương Khóa Luận',
                description: 'Chú Ý xác định đúng đối tượng và tập trung vào quy trình doanh nghiệp',
                startTime:'01/02/2023 00:10:00 ',
                endTime:'20/04/2023 20:00:00 ',
                priority:'highly',
                members:[],
                todoList:[
                    {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
                    {id:2,name:'Viết Mục Tiêu',status:false,isNew:false}
                ],
                fileList:[],
                comments:[],
            },
            {
                id:'project-3',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'Tham Khảo UI',
                description: '',
                startTime:'01/1/2023 00:10:00',
                endTime:'01/03/2023 21:00:00',
                priority:'middle',
                members:[  {
                    id: 1,
                    first_name: 'Nguyễn Đức Minh',
                    last_name: 'Trung',
                    phone_number: '09744148784',
                    gender: 'nam',
                    birth_date: '01-10-2001',
                    mail: 'minhtrung@gmail.com',
                    role: 'CEO',
                    avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                    address: 'Tan Quy Tây, Bình Chanh,HCM',
                    status: 1,
                },
                    {
                        id: 2,
                        first_name: 'Dương Đình Khả',
                        last_name: 'Ngân',
                        phone_number: '08844148784',
                        gender: 'nữ',
                        birth_date: '12-06-1996',
                        mail: 'nganxulaku@gmail.com',
                        role: 'diễn viên',
                        avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
                        address: 'HCM',
                        status: 1,
                    }],
                todoList:[],
                fileList:[],
                comments:[],
            }
        ],
        status: 1,
    },
    {
        id: 2,
        name: 'Sprint 2',
        description: 'Sprint to implement',
        startTime: '18/04/2023 00:10:00',
        endTime: '18/05/2023 23:10:00',
        listTasks: [   {
            id:'project-1',
            boardId  :'kltn-01',
            columnId: 'column-3',
            title:'UI Login',
            description: '',
            startTime:'01/01/2023 00:10:00',
            endTime:'11/03/2023 21:00:00',
            priority:'highly',
            members:[  {
                id: 1,
                first_name: 'Nguyễn Đức Minh',
                last_name: 'Trung',
                phone_number: '09744148784',
                gender: 'nam',
                birth_date: '01-10-2001',
                mail: 'minhtrung@gmail.com',
                role: 'CEO',
                avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                address: 'Tan Quy Tây, Bình Chanh,HCM',
                status: 1,
            }],
            todoList:[],
            fileList:[],
            comments:[],
        },
            {
                id:'project-2',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'UIBase DashBoard',
                description: '',
                startTime:'01/01/2023 00:10:00',
                endTime:'20/03/2023 21:00:00',
                priority:'highly',
                members:[
                    {
                        id: 2,
                        first_name: 'Dương Đình Khả',
                        last_name: 'Ngân',
                        phone_number: '08844148784',
                        gender: 'nữ',
                        birth_date: '12-06-1996',
                        mail: 'nganxulaku@gmail.com',
                        role: 'diễn viên',
                        avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
                        address: 'HCM',
                        status: 1,
                    }],
                todoList:[],
                fileList:[],
                comments:[],
            }
            ,  {
                id:'project-3',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'Đề Cương Khóa Luận',
                description: 'Chú Ý xác định đúng đối tượng và tập trung vào quy trình doanh nghiệp',
                startTime:'01/02/2023 00:10:00 ',
                endTime:'20/04/2023 20:00:00 ',
                priority:'highly',
                members:[],
                todoList:[
                    {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
                    {id:2,name:'Viết Mục Tiêu',status:false,isNew:false}
                ],
                fileList:[],
                comments:[],
            },
            {
                id:'project-3',
                boardId:'kltn-01',
                columnId: 'column-3',
                title:'Tham Khảo UI',
                description: '',
                startTime:'01/1/2023 00:10:00',
                endTime:'01/03/2023 21:00:00',
                priority:'middle',
                members:[  {
                    id: 1,
                    first_name: 'Nguyễn Đức Minh',
                    last_name: 'Trung',
                    phone_number: '09744148784',
                    gender: 'nam',
                    birth_date: '01-10-2001',
                    mail: 'minhtrung@gmail.com',
                    role: 'CEO',
                    avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                    address: 'Tan Quy Tây, Bình Chanh,HCM',
                    status: 1,
                },
                    {
                        id: 2,
                        first_name: 'Dương Đình Khả',
                        last_name: 'Ngân',
                        phone_number: '08844148784',
                        gender: 'nữ',
                        birth_date: '12-06-1996',
                        mail: 'nganxulaku@gmail.com',
                        role: 'diễn viên',
                        avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
                        address: 'HCM',
                        status: 1,
                    }],
                todoList:[],
                fileList:[],
                comments:[],
            }
        ],
        status: 0,
    }
]
function BacklogPage(props) {
    const [project,setProject]=useState({})
    const [loading, setLoading] = React.useState(true);
    const [search,setSearch]=useState([])
    const [showAddSprint,setShowAddSprint]=useState(false)
    const [listSprints,setListSprints]=useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [loadData,setLoadData]=useState(false)
    const dispatch = useDispatch()
    const isReset=useSelector(isResetSprintSelector)
    useEffect(()=>{
        // call API get sprint task lên
        async function fetchDataListSprint() {
            const project=JSON.parse(localStorage.getItem('project'))
            // let params = {};
            // // if (filter.status !== 'all' || filter.role!=='all') params = { ...params, filter };
            // if (search !== '') params = { ...params, search };
            const respond = await getListSprintByProjectId(project.projectId,search);
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
                setProject(respond.data, 'reset-page');
                setListSprints(respond.data);
            } else {
                setProject([])
                return false;
            }
            setLoading(false);
        }
        fetchDataListSprint();

    },[search,isReset,loadData])
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const handleCreateSprint=async (data) => {
       // console.log('Create Sprint: ', data)
        const result = await createSprint(data);
        if(result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
         //  dispatch(setIsResetSprint(true))
            setLoadData(!loadData)
        }
        else if(result.status===0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.4,
            });
        }
        setTimeout(() => {
            setShowAddSprint(false)
        }, 200)
    }
    const handleUpdateSprint=async (id,data) => {
        console.log('Update Sprint: ',id, data)
        const result = await editSprint(id,data);
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
           // dispatch(setIsResetSprint(true))
            setLoadData(!loadData)
        } else if (result.status === 0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.4,
            });
        }

    }
    const handleDeleteSprint=async (item) => {
        console.log('Delete sprint:', item)
        const result = await deleteSprint(item.id);
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            //dispatch(setIsResetSprint(true))
            setLoadData(!loadData)
        } else if (result.status === 0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.4,
            });
        }
    }
    const handleRunSprint=(data)=>{
        handleDeleteSprint(data)
    }
    const handleDeleteTask=(value)=>{
        console.log('Delete Task: ', value)
    }
    const handleCreateTask=(value)=>{
        console.log('Create Task: ', value)
    }
    const handleUpdateTask=(value)=>{
        console.log('Update Task: ', value)
    }
    return (
       <>
           {
               loading ?(<ListSprintSkeleton/>):(
                   <div className='container-backlog'>
                       {contextHolder}
                       <div className='header-backlog'>
                           <div className='breadcrumb'>
                               <Breadcrumb>
                                   <Breadcrumb.Item><NavLink to={config.routes.allProject}>Dự Án</NavLink></Breadcrumb.Item>
                                   <Breadcrumb.Item><NavLink to={config.routes.backlog}>Danh sách chu kỳ phát triển </NavLink></Breadcrumb.Item>

                               </Breadcrumb>
                           </div>
                           <div className='sprint-backlog-header'>
                               <div className= 'sprint-backlog-title'>
                                   <FaList className={'icon'} />
                                   Danh sách chu kỳ phát triển
                               </div>
                               <div className= 'sprint-backlog-actions'>
                                   <SearchHidenButton   width={'15rem'} onSearch={setSearch}/>
                                   <button className='create-sprint' onClick={()=>setShowAddSprint(true)}>
                                       Tạo mới chu kỳ phát triển
                                   </button>
                               </div>
                           </div>
                       </div>
                       <div className='content-backlog'>
                           <BoardSprint
                               project={project} onBoard={handleUpdateSprint} columnData={listSprints}
                               onEdit={handleUpdateSprint}
                               onDelete={handleDeleteSprint}
                               onDeleteTask={handleDeleteTask}
                               onCreateTask={handleCreateTask}
                               onUpdateTask={handleUpdateTask}
                           />
                           {/*{*/}
                           {/*    !!listSprints && listSprints.map((item) =>(*/}
                           {/*        <SprintItem key={item.id} sprint={item} onEdit={handleUpdateSprint} onDelete={handleDeleteSprint} />*/}
                           {/*    ))*/}
                           {/*}*/}
                           {/*<Backlog />*/}

                       </div>
                       <Modal title="Tạo Mới " open={showAddSprint}
                              destroyOnClose
                              maskClosable={true}
                              onCancel={()=>setShowAddSprint(false)}
                              footer={null}
                              width={700}
                              style={{top: 150}}
                       >
                           <AddSprint onClose={()=>setShowAddSprint(false)} onSave={handleCreateSprint} />
                       </Modal>


                   </div>
               )
           }
       </>
    );
}

export default BacklogPage;