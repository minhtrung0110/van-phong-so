import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import SprintItem from "~/components/Client/Project/SprintItem";
import {FaAngleRight, FaArrowLeft, FaList} from "react-icons/fa";
import FilterProject from "~/components/commoms/FilterProject";
import {listMembersForTask} from "~/asset/data/initalDataTask";
import {Breadcrumb, Modal} from "antd";
import AddSprint from "~/components/Client/Project/AddSprint";
import {NavLink} from "react-router-dom";
import {config} from "~/config";
import {useSelector} from "react-redux";
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
   // const project=useSelector(boardSelector)
    const [filter,setFilter]=useState()
    const [showAddSprint,setShowAddSprint]=useState(false)
    const [listSprints,setListSprints]=useState(data)

    useEffect(()=>{
        // call API get sprint task lên
        console.log(filter)
    },[filter])
    const handleCreateSprint=(data)=>{
        console.log(data)
    }
    const handleUpdateSprint=(data)=>{
        console.log(data)
    }
    const handleDeleteSprint=(data)=>{
        console.log(data)
    }
    const handleRunSprint=(data)=>{
        handleDeleteSprint(data)
    }
    return (
        <div className='container-backlog'>
            <div className='header-backlog'>
                <div className='breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item><NavLink to={config.routes.project}>Dự Án</NavLink></Breadcrumb.Item>
                        <Breadcrumb.Item><NavLink to={config.routes.backlog}>Danh sách công việc</NavLink></Breadcrumb.Item>

                    </Breadcrumb>
                </div>
                <div className='sprint-backlog-header'>
                    <div className= 'sprint-backlog-title'>

                        <FaList className={'icon'} />
                        Danh sách công việc
                    </div>
                    <div className= 'sprint-backlog-actions'>
                        <FilterProject onFilter={setFilter} listMember={listMembersForTask} className='filter-btn' />
                        <button className='create-sprint' onClick={()=>setShowAddSprint(true)}>
                            Tạo mới phiên dự án
                        </button>
                    </div>
                </div>
            </div>
            <div className='content-backlog'>


                {
                    !!listSprints && listSprints.map((item) =>(
                        <SprintItem sprint={item} onEdit={handleUpdateSprint} onDelete={handleUpdateSprint} />
                    ))
                }

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