import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from "antd";
import {FaAngleDown, FaFlipboard, FaListUl, FaPlus} from "react-icons/fa";
import styles from './SelectHeaderProject.module.scss'
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import './customOverlay.scss'
SelectHeaderProject.propTypes = {

};

const cx=classNames.bind(styles)
function SelectHeaderProject() {
    const onClick = ({ key }) => {
        //  onCurrentProject(key)
    };
    const items = [
        {
            key: '1',
            type: 'group',
            label: 'Dự Án Gần Đây',
            children: [
                {
                    label: 'Phát triển ứng dụng đinh tuyến',
                    key: '1-1',
                },
                {
                    label: 'Phát triển ứng dụng mạng xã hội',
                    key: '1-2',
                },
                {
                    label: 'Phát triển ứng dụng đinh tuyến',
                    key: '1-3',
                },
                {
                    label: 'Phát triển ứng dụng mạng xã hội',
                    key: '1-4',
                },
                {
                    label: 'Phát triển ứng dụng đinh tuyến',
                    key: '1-5',
                },
            ],
        },
        {
            key: '2',
            label: (
                <NavLink to={'/all-project'} className={cx('action-project')}>
                   <FaListUl className={cx('action-project-icon')}/> Tất cả dự án
                </NavLink>
            ),

        },
        {
            key: '3',
            label: (
                <div className={cx('action-project')}>
                  <FaPlus className={cx('action-project-icon')}/>  Tạo dự án mới
                </div>
            ),

        },

    ];
    return (
        <div className={cx("select-board")}>
            <Dropdown
                menu={{
                    items,
                    onClick,
                    selectable: true,

                }}
                trigger={['click']}
                overlayClassName='custom-overlay-dropdown'
            >
                <div className={cx('dropdown-board')}>
                    <FaFlipboard className={cx('icon')} />
                    <span className={cx('board-title')}> Dự Án</span>
                    <FaAngleDown  className={cx('icon-down')}/>
                </div>
            </Dropdown>

        </div>
    );
}

export default SelectHeaderProject;