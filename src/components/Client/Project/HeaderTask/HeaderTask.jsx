import React, {useState} from 'react';
import "./HeaderTask.scss"
import {Dropdown, Modal} from "antd";
import {FaAngleDown, FaFlipboard, FaPlus} from "react-icons/fa";
import AddProject from "~/components/Client/Project/Add";
import {useDispatch} from "react-redux";
import {setIsCreateProject} from "~/redux/reducer/task/taskReducer";


HeaderTask.prototype={

}
function HeaderTask({onCurrentProject}) {
    const [openAddProject,setOpenAddProject] = useState(false)
    const onClick = ({ key }) => {
        onCurrentProject(key)
    };
    const items = [
        {
            label: 'Cơ Sở Dữ Liệu Phân Tán',
            key: '1',
        },
        {
            label: 'Lập Trình Mạng',
            key: '2',
        },
        {
            label: 'Cá Nhân Khóa Luận',
            key: '3',
        },
    ];
    const dispatch=useDispatch()
    const handleCreateNewProject=() => {
        setOpenAddProject(true)
    }
    const handleCancelCreateProject=()=>{
       setOpenAddProject(false)
    }
    return (
        <div className="navbar-app">
            <div className="select-board">
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                >
                  <div className='dropdown-board'>
                        <FaFlipboard className='icon' />
                      <span className='board-title'> Dự Án</span>
                      <FaAngleDown  className='icon-down'/>
                  </div>
                </Dropdown>

            </div>
            <div className='add-board'>
                <FaPlus className='icon' />
                <button className='btn-add-board' onClick={handleCreateNewProject}>Tạo Dự Án</button>
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