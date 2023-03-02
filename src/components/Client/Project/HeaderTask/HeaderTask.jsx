import React, {useState} from 'react';
import "./HeaderTask.scss"
import {Dropdown, Modal} from "antd";
import {FaAngleDown, FaFlipboard, FaPlus} from "react-icons/fa";
import AddProject from "~/components/Client/Project/Add";


HeaderTask.prototype={

}
function HeaderTask(props) {
    const [openAddProject,setOpenAddProject] = useState(false)
    const onClick = ({ key }) => {
        console.log(key)
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
                <button className='btn-add-board' onClick={()=>setOpenAddProject(true)}>Tạo Dự Án</button>
            </div>
            <Modal
                title="Tạo Dự Án Mới"
                onCancel={()=>setOpenAddProject(false)}
                footer={null}
                width={700}
                style={{ top: 100 }}
                open={openAddProject}
            >
                <AddProject />
            </Modal>
        </div>
    );
}

export default HeaderTask;