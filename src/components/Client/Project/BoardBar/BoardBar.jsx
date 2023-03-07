import React, {useState} from 'react';
import "./BoardBar.scss"
import {Avatar, Dropdown, Space, Tooltip} from "antd";
import {FaAngleDown, FaClipboardList, FaDocker, FaEllipsisH, FaFilter, FaSearch, FaTasks, FaUser} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import GroupMember from "~/components/Client/Task/GroupMember";

function BoardBar({boardName,onFilter,onSearch}) {
    const onClick = ({ key }) => {
        onFilter(key)
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
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
                    }}
                    className='filter-btn'
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <FaFilter/>
                         Bộ lọc
                        </Space>
                    </a>
                </Dropdown>
             <GroupMember addMember={true} />
                <button className='btn-more'> <FaEllipsisH className='dot'/></button>
            </div>
        </div>
    );
}

export default BoardBar;