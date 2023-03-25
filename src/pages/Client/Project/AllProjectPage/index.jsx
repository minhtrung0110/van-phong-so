import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaList, FaPlus} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import NotFoundData from "~/components/commoms/NotFoundData";
import ProjectTable from "~/components/Client/Project";
import {project_table_header} from "~/asset/data/project-table-header";
import {initialData} from "~/asset/data/initalDataTask";
import {isEmpty} from "lodash";
import {Modal} from "antd";
import AddProject from "~/components/Client/Project/Add";
AllProjectPage.propTypes = {

};

function AllProjectPage(props) {
    const [listProject,setListProject] = useState(initialData.boards)
    const [openAddProject,setOpenAddProject] = useState(false)
    const handleCreateNewProject=() => {
        setOpenAddProject(true)
    }
    useEffect(()=>{
     //   setListProject(initialData.boards)
    },[])
    return (
        <div className={'container-list-project'}>
            <div className={'header-list-project'}>
                <div className='title'><FaList/>
                    Danh sách dự án
                </div>
                <div className={'filter-list-project'}>
                    <SearchHidenButton width='20rem' />
                    <div className={'create-project '} onClick={handleCreateNewProject}>
                        <FaPlus className='icon' />
                        <span className='text' >Tạo Dự Án</span>
                    </div>
                </div>
            </div>
            <div className={'content-list-project'}>
                {
                    !isEmpty(listProject) ? (
                        <ProjectTable tableHeader={project_table_header} tableBody={listProject}/>
                    ) : (
                        <NotFoundData/>
                    )

                }
            </div>
            <Modal
                title="Tạo Dự Án Mới"
                onCancel={()=>setOpenAddProject(false)}
                footer={
                    <div className='footer-create-project'>
                        <button className='btn-cancel' onClick={()=>setOpenAddProject(false)}>Hủy</button>
                        <button className='btn-add' type='submit'>Thêm</button>
                    </div>
                }
                width={500}
                style={{ top: 100   }}
                bodyStyle={{height: "400px"}}

                open={openAddProject}
            >
                <AddProject  />
            </Modal>
        </div>
    );
}

export default AllProjectPage;