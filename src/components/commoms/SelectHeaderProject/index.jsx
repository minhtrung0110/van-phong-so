import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from "antd";
import {FaAngleDown, FaFlipboard, FaListUl, FaPlus} from "react-icons/fa";
import styles from './SelectHeaderProject.module.scss'
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import './customOverlay.scss'
import {config} from "~/config";
import {useDispatch} from "react-redux";
import {setKeyProject} from "~/redux/reducer/project/projectReducer";
SelectHeaderProject.propTypes = {

};

const cx=classNames.bind(styles)
const data=[
    {
        name: 'Phát triển ứng dụng đinh tuyến',
        id: '1-1',
    },
    {
        name: 'Phát triển ứng dụng mạng xã hội',
        id: '1-2',
    },
    {
        name: 'Phát triển ứng dụng đinh tuyến',
        id: '1-3',
    },
    {
        name: 'Phát triển ứng dụng mạng xã hội',
        id: '1-4',
    },
    {
        name: 'Phát triển ứng dụng đinh tuyến',
        id: '1-5',
    },
]
function SelectHeaderProject() {
    const [listProject,setListProject]=useState([])
    useEffect(()=>{
        // calll API get ALL Project
        const convertData=data.map((item)=>({label:item.name,key:item.id}))
        setListProject(convertData)
    },[])
    const handleClickMenu = ({ key }) => {
        //  onCurrentProject(key)
       if(key==='create-project'){

       }
       else if(key==='all-projects'){

       }
       else dispatch(setKeyProject(key))
    };
    const dispatch =useDispatch()
    const items = [
        {
            key: 'list-project',
            type: 'group',
            label: 'Dự Án Gần Đây',
            children: listProject,
        },
        {
            key: 'all-projects',
            label: (
                <NavLink to={config.routes.allProject} className={cx('action-project')}>
                   <FaListUl className={cx('action-project-icon')}/> Tất cả dự án
                </NavLink>
            ),

        },
        {
            key: 'create-project',
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
                    onClick:handleClickMenu,
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