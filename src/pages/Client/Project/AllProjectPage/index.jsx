import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaListAlt, FaPlus} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import NotFoundData from "~/components/commoms/NotFoundData";
import ProjectTable from "~/components/Client/Project";
import {project_table_header} from "~/asset/data/project-table-header";
import {initialData} from "~/asset/data/initalDataTask";
import {isEmpty} from "lodash";
import {Modal,message} from "antd";
import AddProject from "~/components/Client/Project/Add";
import {useDispatch} from "react-redux";
AllProjectPage.propTypes = {

};

function AllProjectPage(props) {
    const [listProject,setListProject] = useState(initialData.boards)
    const [openAddProject,setOpenAddProject] = useState(false)
    const [search,setSearch] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const handleCreateNewProject=(data) => {
        console.log('Create new project:',data)
        setOpenAddProject(false)
        messageApi.open({
            type: 'success',
            content: 'Tạo dự án mới thành công',
            duration: 1.3,
        });
    }
    const handleCancelCreateNewProject=() => {
        setOpenAddProject(false)
    }
    const handleUpdateProject=(data) => {
        console.log('Update project:',data)
        messageApi.open({
            type: 'success',
            content: 'Câp nhật dự án thành công',
            duration: 1.3,
        });
    }
    const handleDeleteProject=(id) => {
        console.log('Delete project:',id)
        messageApi.open({
            type: 'success',
            content: 'Xóa dự án thành công',
            duration: 1.3,
        });
    }
    useEffect(()=>{
     //   setListProject(initialData.boards)
        console.log('Search project:',search)
    },[search])
    return (
        <div className={'container-list-project'}>
            {contextHolder}
            <div className={'header-list-project'}>
                <div className='title'><FaListAlt/>
                    Danh Sách Dự Án
                </div>
                <div className={'filter-list-project'}>
                    <SearchHidenButton width='20rem' onSearch={setSearch} />
                    <div className={'create-project '} onClick={()=>setOpenAddProject(true)}>
                        <FaPlus className='icon' />
                        <span className='text' >Tạo Dự Án</span>
                    </div>
                </div>
            </div>
            <div className={'content-list-project'}>
                {
                    !isEmpty(listProject) ? (
                        <ProjectTable tableHeader={project_table_header} tableBody={listProject}
                                      onUpdate={handleUpdateProject} onDelete={handleDeleteProject}/>
                    ) : (
                        <NotFoundData/>
                    )

                }
            </div>
            <Modal
                title="Tạo Dự Án Mới"
                onCancel={handleCancelCreateNewProject}
                footer={null}
                destroyOnClose={true}
                width={500}
                style={{ top: 100   }}
                bodyStyle={{height: "400px"}}

                open={openAddProject}
            >
                <AddProject onCancel={handleCancelCreateNewProject} onSave={handleCreateNewProject} />
            </Modal>

        </div>
    );
}

export default AllProjectPage;