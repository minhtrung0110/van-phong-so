import React, {useState} from 'react';
import "./BoardBar.scss"
import {Avatar, Dropdown, Space, Tooltip} from "antd";
import {
    FaAngleDown,
    FaClipboardList,
    FaDocker,
    FaEllipsisH,
    FaFilter,
    FaRegFlag,
    FaSearch,
    FaTasks,
    FaUser
} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import GroupMember from "~/components/Client/Task/GroupMember";

function BoardBar({boardName,onFilter,onSearch}) {
    const onClick = ({ key }) => {
        onFilter(key)
    };
    const items = [
        {
            label: 'Trạng Thái Công Việc',
            key: '1',
            icon: <FaRegFlag />,
        },
        {
            label: 'Công Việc Của Tôi',
            key: '2',
            icon: <FaRegFlag />,
        },
        {
            label: 'Thời Gian',
            key: '3',
            icon: <FaRegFlag />,
        },
        {
            label: 'Độ Ưu Tiên',
            key: '4',
            icon: <FaRegFlag />,
        },

    ];
    return (
        <div className="navbar-board">
            <div className="board-view">
                <h4 className='board-name'> <FaClipboardList className='icon'/> {boardName}</h4>
            </div>
            <div className="board-filter">
                <SearchHidenButton className='search'  width='14rem' height='2rem'  searchButtonText={<FaSearch/>}
                    onSearch={onSearch}
                    />
                <Dropdown
                    menu={{
                        items,
                        onClick,
                        selectable: true,
                    }}
                    className='filter-btn'
                    overlayClassName='overlay-dropdown-filter-task'
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <div className='filter-task'>
                            <FaFilter className='icon'/>
                         Bộ lọc
                        </div>
                    </a>
                </Dropdown>
             <GroupMember addMember={true} />
                <button className='btn-more'> <FaEllipsisH className='dot'/></button>
            </div>
        </div>
    );
}

export default BoardBar;