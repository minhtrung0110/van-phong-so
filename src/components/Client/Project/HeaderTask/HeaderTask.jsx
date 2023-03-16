import React, {useState} from 'react';
import "./HeaderTask.scss"
import {Dropdown, Modal} from "antd";
import {FaAngleDown, FaFlipboard, FaListUl, FaPlus} from "react-icons/fa";
import AddProject from "~/components/Client/Project/Add";
import {useDispatch} from "react-redux";
import {setIsCreateProject} from "~/redux/reducer/task/taskReducer";


HeaderTask.prototype={

}
function HeaderTask({onCurrentProject}) {
    const [openAddProject,setOpenAddProject] = useState(false)

    const dispatch=useDispatch()
    const handleCreateNewProject=() => {
        setOpenAddProject(true)
    }
    const handleCancelCreateProject=()=>{
       setOpenAddProject(false)
    }
    return (
        <div className="navbar-app">
            <div className='list-task' >
                <FaListUl className='icon' />
                <span className='text' >Danh Sách Công Việc</span>
            </div>
            <div className='add-board' onClick={handleCreateNewProject}>
                <FaPlus className='icon' />
                <span className='text' >Tạo Dự Án</span>
            </div>
            <Modal
                title="Tạo Dự Án Mới"
                onCancel={handleCancelCreateProject}
                footer={
                    <div className='footer-create-project'>
                        <button className='btn-cancel' onClick={handleCancelCreateProject}>Hủy</button>
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

export default HeaderTask;