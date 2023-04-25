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
import {boardSelector} from "~/redux/selectors/project/projectSelector";


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
    const [filter,setFilter]=useState([])
    const [showAddSprint,setShowAddSprint]=useState(false)
    const [listSprints,setListSprints]=useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [backlog,setBacklog]=useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        // call API get sprint task lên
        const project=JSON.parse(localStorage.getItem('project'))
        const boardFromDB = initialData.boards.find(board => board.id === project.projectId)

        setProject(boardFromDB)
        if (boardFromDB){
         //   console.log(boardFromDB.sprints)
            setListSprints(boardFromDB.sprints)
        }
        console.log('Filter: ',filter)

    },[filter])
    const handleCreateSprint=(data)=>{
        console.log('Create Sprint: ',data)
        messageApi.open({
            type: 'success',
            content: 'Tạo thành công',
            duration: 1.5,
        });
        setTimeout(()=>{setShowAddSprint(false)},800)
    }
    const handleUpdateSprint=(data)=>{
        console.log('Update sprint:',data)
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
            duration: 1.3,
        });
    }
    const handleDeleteSprint=(data)=>{
        console.log('Delete sprint:',data)
        messageApi.open({
            type: 'success',
            content: 'Xóa thành công',
            duration: 1.5,
        });
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
        <div className='container-backlog'>
            {contextHolder}
            <div className='header-backlog'>
                <div className='breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item><NavLink to={config.routes.allProject}>Dự Án</NavLink></Breadcrumb.Item>
                        <Breadcrumb.Item><NavLink to={config.routes.backlog}>Danh sách công việc</NavLink></Breadcrumb.Item>

                    </Breadcrumb>
                </div>
                <div className='sprint-backlog-header'>
                    <div className= 'sprint-backlog-title'>
                        <FaList className={'icon'} />
                        Danh sách công việc
                    </div>
                    <div className= 'sprint-backlog-actions'>
                        <FilterProject onFilter={setFilter} listmember={listMembersForTask} className='filter-btn' />
                        <button className='create-sprint' onClick={()=>setShowAddSprint(true)}>
                            Tạo mới phiên dự án
                        </button>
                    </div>
                </div>
            </div>
            <div className='content-backlog'>

                <BoardSprint
                    board={project} onBoard={handleUpdateSprint} columnData={listSprints}
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
    );
}

export default BacklogPage;