import React from 'react';
import "./HeaderTask.scss"
import {Dropdown} from "antd";
import {FaAngleDown, FaFlipboard} from "react-icons/fa";


HeaderTask.prototype={

}
function HeaderTask(props) {
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
        </div>
    );
}

export default HeaderTask;