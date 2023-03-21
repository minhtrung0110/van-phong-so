import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownCustom.module.scss'
import classNames from "classnames/bind";
import {Dropdown} from "antd";
import {FaAngleDown, FaFlipboard} from "react-icons/fa";
DropdownCustom.propTypes = {
    
};
const cx=classNames.bind(styles)
function DropdownCustom({listOptions,defaultSelectedKey,slot,onClick,...props}) {

    const [data,setData]=useState(listOptions)
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
            label: 'Cá Nhân Khóa Luận Minnh Trung',
            key: '3',
        },
    ];
    console.log('check',data)
    return (
        <div className={cx('')}>
            <Dropdown
                menu={{
                    items,
                    onClick,
                    selectable: true,
                    defaultSelectedKeys: defaultSelectedKey,
                }}
                overlayClassName={cx('custom-overlay-dropdown')}
                {...props}
            >
                {slot}
            </Dropdown>
        </div>
    );
}

export default DropdownCustom;