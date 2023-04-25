import React, {useState} from 'react';
import "./BoardBar.scss"
import {Dropdown} from "antd";
import {
    FaClipboardList, FaEdit,
    FaEllipsisH,
    FaTrash,

} from "react-icons/fa";
import GroupMember from "~/components/Client/Task/GroupMember";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import FilterProject from "~/components/commoms/FilterProject";
import {listMembersForTask} from "~/asset/data/initalDataTask";

function BoardBar({boardName, sprintName, onFilter}) {
    const [showConfirmDelete, setIsShowConfirmDelete] = useState(false)

    const listActionProjects = [
        {
            label: 'Cập Nhật Dự Án',
            key: '1',
            icon: <FaEdit/>,
        },
        {
            label: 'Hủy Dự Án',
            key: '2',
            icon: <FaTrash/>,
        },

    ];
    const handleChooseActionProject = ({key}) => {
        if (key === '2') {
            setIsShowConfirmDelete(true)
        }
    };
    const handleRemoveProject = () => {
        setIsShowConfirmDelete(false)
    }
    return (
        <div className="navbar-board">
            <div className="board-view">
                <h4 className='board-name'><FaClipboardList className='icon'/> {boardName}</h4>
            </div>
            <div className="board-filter">
                <div className="sprint-name">{sprintName}</div>
                <FilterProject onFilter={onFilter} listmember={listMembersForTask} className={'filter-btn'}/>
                <GroupMember />
                <div>
                    <Dropdown
                        menu={{
                            items: listActionProjects,
                            onClick: handleChooseActionProject,
                        }}
                        className='action-project'
                        overlayClassName='overlay-dropdown-action-project'
                    >
                        <button className='btn-more'><FaEllipsisH className='dot'/></button>
                    </Dropdown>
                </div>

            </div>

            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Thực Sự Muốn Xóa Dự Án <strong>${boardName}</strong> Này ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setIsShowConfirmDelete(false)}
                          onOK={handleRemoveProject}/>
        </div>
    );
}

export default BoardBar;