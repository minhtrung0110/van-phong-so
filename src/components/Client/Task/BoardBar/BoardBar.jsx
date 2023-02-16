import React from 'react';
import "./BoardBar.scss"
import {Avatar, Tooltip} from "antd";
import {FaDocker, FaUser} from "react-icons/fa";

function BoardBar(props) {
    return (
        <div className="navbar-board">
            <h4 className="board-name">{props.boardName}</h4>
            <div className="board-view">

            </div>
            <div className="board-filter">
                <Avatar.Group
                    maxCount={2}
                    size="middle"
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
            </div>
        </div>
    );
}

export default BoardBar;