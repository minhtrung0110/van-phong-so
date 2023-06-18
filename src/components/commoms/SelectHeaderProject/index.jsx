import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Modal} from "antd";
import {FaAngleDown, FaFlipboard, FaListUl, FaPlus} from "react-icons/fa";
import styles from './SelectHeaderProject.module.scss'
import classNames from "classnames/bind";
import {NavLink, useNavigate} from "react-router-dom";
import './customOverlay.scss'
import {setIsAdd} from "~/redux/reducer/project/projectReducer";
import {config} from "~/config";
import {useDispatch} from "react-redux";
import {setKeyProject} from "~/redux/reducer/project/projectReducer";
import AddProject from "~/components/Client/Project/Add";
import project from "~/components/Client/Project";
import {getListProjects} from "~/api/Client/Sprint/sprintAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
SelectHeaderProject.propTypes = {

};

const cx=classNames.bind(styles)
const data=[
    {
        name: 'Khóa Luận Tốt Nghiêp',
        id: 'ktln-01',
    },
    {
        name: 'Phần mềm thi trắc nghiệm đa nền tảng',
        id: 'quiz1',
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
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        async function fetchDataProject() {
            const userLoginId=localStorage.getItem('userIdLogin')
            const params={sort:'updated_at',user_id:userLoginId}
            const respond = await getListProjects(params);
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setListProject([])
                return false;
            } else {
                let data=respond.results.map((item)=>({label:item.name,key:item.id}))

                setListProject(data);
            }
        }
        fetchDataProject();

    },[])
    console.log('Test: ',listProject)
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
        navigate(config.routes.login)
    };
    const handleCreateNewProject=(data) => {
        dispatch(setIsAdd(true))
    }
    const handleClickMenu = ({ key }) => {
        //  onCurrentProject(key)
       if(key==='create-project'){
           dispatch(setIsAdd(true))
       }
       else if(key==='all-projects'){

       }
       else {
           const storage=JSON.parse(localStorage.getItem('project'))
           const newCurrentProject={...storage,projectId:key}
           localStorage.setItem('project',JSON.stringify(newCurrentProject))
           dispatch(setKeyProject(key))
           navigate(config.routes.backlog)
       }
    };
    const items = [
        {
            key: 'list-project',
            type: 'group',
            label: 'Dự Án Gần Đây',
            children: listProject.slice(0, 5),
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
                <div className={cx('action-project')} >
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