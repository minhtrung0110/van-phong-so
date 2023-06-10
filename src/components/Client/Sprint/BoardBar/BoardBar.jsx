import React, {useState} from 'react';
import "./BoardBar.scss"
import {Dropdown, Modal} from "antd";
import {
    FaClipboardList, FaEdit,
    FaEllipsisH,
    FaTrash, FaTrophy,

} from "react-icons/fa";
import GroupMember from "~/components/Client/Task/GroupMember";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import FilterProject from "~/components/commoms/FilterProject";
import {listMembersForTask} from "~/asset/data/initalDataTask";
import CompleteSprint from "~/components/Client/Sprint/CompleteSprint";

function BoardBar({boardName,members, sprint, onFilter,onCompleteSprint,onDeleteSprint}) {
    console.log('Testing: ',members)
    const [showConfirmDelete, setIsShowConfirmDelete] = useState(false)
    const [showCompleteSprint, setShowCompleteSprint]=useState()
    const listActionProjects = [
        {
            label: 'Hoàn Thành Chu Kỳ Phát Triển',
            key: '1',
            icon: <FaTrophy />,
        },
        {
            label: 'Xóa Chu Kỳ Phát Triển',
            key: '2',
            icon: <FaTrash/>,
        },

    ];
    const handleChooseActionProject = ({key}) => {
        if (key === '2') {
            setIsShowConfirmDelete(true)
        }
        else if (key === '1') {
            setShowCompleteSprint(true)
        }
    };
    const handleRemoveSprint = () => {
        setIsShowConfirmDelete(false)
        onDeleteSprint(sprint)
    }
    const handleCompleteSprint=()=>{
        onCompleteSprint(sprint.id, {...sprint, status:2})
    }
    return (
        <div className="navbar-board">
            <div className="board-view">
                <h4 className='board-name'><FaClipboardList className='icon'/> {members.name}</h4>
            </div>
            <div className="board-filter">
                <div className="sprint-name">{sprint.title}</div>
                <FilterProject onFilter={onFilter} listmember={members.members} />
                <GroupMember defaultMembers={members.members} sizeAvatar={'small'} />
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
            <Modal title="" open={showCompleteSprint}
                   destroyOnClose
                   maskClosable={true}
                   onCancel={() => setShowCompleteSprint(false)}
                   footer={null}
                   width={450}
                   style={{top: 80}}
            >
                <CompleteSprint sprint={sprint} onComplete={handleCompleteSprint} onCancel={setShowCompleteSprint} />
            </Modal>
            <ConfirmModal open={showConfirmDelete} title='Xác Nhận Xóa'
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Thực Sự Muốn Xóa Chu Kỳ <strong>${sprint.title}</strong> Này ? `}} />}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setIsShowConfirmDelete(false)}
                          onOK={handleRemoveSprint}/>
        </div>
    );
}

export default BoardBar;