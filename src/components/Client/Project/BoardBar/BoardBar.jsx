import React, {useState} from 'react';
import "./BoardBar.scss"
import {Avatar, Dropdown, Space, Tooltip} from "antd";
import {
    FaAngleDown,
    FaClipboardList,
    FaDocker, FaEdit,
    FaEllipsisH,
    FaFilter,
    FaRegFlag,
    FaSearch,
    FaTasks, FaTrash,
    FaUser
} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import GroupMember from "~/components/Client/Task/GroupMember";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import FilterProject from "~/components/commoms/FilterProject";
import {listStaffs} from "~/asset/data/initDataGlobal";
import {listMembersForTask} from "~/asset/data/initalDataTask";

function BoardBar({boardName,onFilter,onSearch}) {
    const [showConfirmDelete,setIsShowConfirmDelete]=useState(false)

    const listActionProjects = [
        {
            label: 'Cập Nhật Dự Án',
            key: '1',
            icon: <FaEdit />,
        },
        {
            label: 'Hủy Dự Án',
            key: '2',
            icon: <FaTrash />,
        },

    ];
    const onClick = ({ key }) => {
        onFilter(key)
    };
    const handleChooseActionProject = ({ key }) => {
            if(key==='2'){
                setIsShowConfirmDelete(true)
            }
    };
    const handleRemoveProject=()=>{
        setIsShowConfirmDelete(false)
    }
    return (
        <div className="navbar-board">
            <div className="board-view">
                <h4 className='board-name'> <FaClipboardList className='icon'/> {boardName}</h4>
            </div>
            <div className="board-filter">
                <SearchHidenButton className='search'  width='14rem' height='2rem'  searchButtonText={<FaSearch/>}
                    onSearch={onSearch}
                    />
            <FilterProject onFilter={onFilter} listMember={listMembersForTask} />
             <GroupMember addMember={true} />
              <div>
                  <Dropdown
                      menu={{
                          items:listActionProjects,
                          onClick:handleChooseActionProject,
                      }}
                      className='action-project'
                      overlayClassName='overlay-dropdown-action-project'
                  >
                      <button className='btn-more'> <FaEllipsisH className='dot'/></button>
                  </Dropdown>
              </div>

            </div>

            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa' content={`Bạn Có Thực Sự Muốn Xóa Cột ${boardName} Này ? `}
                          textCancel='Hủy' textOK='Xóa' onCancel={()=>setIsShowConfirmDelete(false)} onOK={handleRemoveProject}/>
        </div>
    );
}

export default BoardBar;