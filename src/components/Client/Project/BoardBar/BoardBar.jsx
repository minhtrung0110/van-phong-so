import React from 'react';
import "./BoardBar.scss"
import {Avatar, Dropdown, Space, Tooltip} from "antd";
import {FaAngleDown, FaClipboardList, FaDocker, FaEllipsisH, FaFilter, FaSearch, FaTasks, FaUser} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";

function BoardBar(props) {
    const onClick = ({ key }) => {
        console.log(key)
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
                <h4 className='board-name'> <FaClipboardList className='icon'/> {props.boardName}</h4>
            </div>
            <div className="board-filter">
                <SearchHidenButton className='search' width='14rem' height='2rem' searchButtonText={<FaSearch/>} />
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
                <Avatar.Group
                    maxCount={2}
                    size="middle"
                    className='avatar-group'
                    maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    }}
                >
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar
                        style={{
                            backgroundColor: '#d50f96',
                        }}
                    >
                        K
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<FaUser />}
                        />
                    </Tooltip>
                    <Avatar
                        style={{
                            backgroundColor: '#1890ff',
                        }}
                        icon={<FaDocker />}
                    />
                </Avatar.Group>
                <button className='btn-more'> <FaEllipsisH className='dot'/></button>
            </div>
        </div>
    );
}

export default BoardBar;