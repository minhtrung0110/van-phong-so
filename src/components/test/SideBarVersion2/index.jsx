import { Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    FaCalendar, FaCogs,
    FaHome, FaLaptop, FaLayerGroup, FaListAlt, FaNewspaper,
    FaPeopleArrows, FaProjectDiagram, FaRecycle,
    FaTasks, FaUserCog
} from "react-icons/fa";
import {useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import './style.scss'
import Sider from "antd/es/layout/Sider";
import {NavLink, useLocation,} from "react-router-dom"
import {config} from "~/config";
import ImageCustom from "~/components/commoms/Image";
import imgCompany from "~/asset/images/logonCompany.png"
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {isEmpty} from "lodash";
import SidebarSkeleton from "~/components/commoms/Skeleton/Sidebar/SidebarSkeleton";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const arrayMenuItems=[
    {id:1,key:'Post',keyMenu:config.routes.home,name:'Bài Viết',link:config.routes.home,icon:<FaHome/>,group:1},
    {id:2,key:'Department',keyMenu:config.routes.department,name:'Phòng Ban',link:config.routes.department,icon:<FaLaptop/>,group:1},
       {id:3,key:'Staff',keyMenu:config.routes.staff,name:'Nhân Sự',link:config.routes.staff,icon:<FaPeopleArrows/>,group:1},
    {id:4,key:'Role',keyMenu:config.routes.decentralize,name:'Chức Danh',link:config.routes.decentralize,icon:<FaUserCog/>,group:1},
    {id:5,key:'Setting',keyMenu:config.routes.setting,name:'Cài Đặt',link:config.routes.setting,icon:<FaCogs/>,group:1},
    {id:6,key:'Project',keyMenu:config.routes.allProject,name:'Dự Án',link:config.routes.allProject,icon:<FaListAlt/>,group:2},
    {id:7,key:'Sprint',keyMenu:config.routes.backlog,name:'Chu Kỳ',link:config.routes.backlog,icon:<FaRecycle/>,group:2},
    {id:8,key:'Task',keyMenu:config.routes.project,name:'Công Việc',link:config.routes.project,icon:<FaTasks/>,group:2},
    {id:9,key:'Calendar',keyMenu:config.routes.schedule,name:'Lịch Biểu',link:config.routes.schedule,icon:<FaCalendar/>,group:0},
]


export const listMenuClientItems = [
    getItem('Tổ Chức', 'group', <FaLayerGroup/>, [
            getItem(<NavLink to={config.routes.home}>Bảng Tin</NavLink>, config.routes.home, <FaHome/>),
         //   getItem(<NavLink to={config.routes.post}>Bài Viết</NavLink>, config.routes.post, <FaNewspaper/>),
            getItem(<NavLink to={config.routes.staff}>Nhân Sự</NavLink>, config.routes.staff, <FaPeopleArrows/>),
            getItem(<NavLink to={config.routes.department}>Phòng Ban</NavLink>, config.routes.department, <FaLaptop/>),
            getItem(<NavLink to={config.routes.decentralize}>Chức Danh</NavLink>, config.routes.decentralize,
                <FaUserCog/>),
            getItem(<NavLink to={config.routes.setting}>Cài Đặt</NavLink>, config.routes.setting, <FaCogs/>),
        ]
    ),
    getItem('Dự Án', 'project', <FaProjectDiagram/>, [
        getItem(<NavLink to={config.routes.allProject}>Dự Án</NavLink>, config.routes.allProject, <FaListAlt/>),
        getItem(<NavLink to={config.routes.backlog}>Chu Kỳ</NavLink>, config.routes.backlog, <FaRecycle/>),
        getItem(<NavLink to={config.routes.project}>Công Việc</NavLink>, config.routes.project, <FaTasks/>),
        ]
    ),

    getItem(<NavLink to={config.routes.schedule}>Lịch Biểu</NavLink>, config.routes.schedule, <FaCalendar/>),


];
const SideBarVersion2 = () => {
    const location = useLocation();
    const collapsed = useSelector(isCollapseSideBar)
    const [openKey, setOpenKey] = useState(['group']);
    const userLogin=useSelector(getUserSelector)
    const arrayPermissions = !isEmpty(userLogin) && userLogin.permission
        .filter(item => Object.keys(item.permission).some(key => key.includes('view') && item.permission[key] === true))
        .map(item => item.name);

    const viewPermissions=Array.isArray(arrayPermissions) ?arrayPermissions.concat('Post','Calendar'):[]
    console.log('Test permissions: ',viewPermissions)
    const listMenuItems = !isEmpty(userLogin) ?arrayMenuItems.reduce((acc, item, currentIndex) => {
        if (viewPermissions.includes(item.key)) {
            return acc.concat(item);
        }
        return acc;
    }, []):[]
    const  groupCompany=  getItem('Tổ Chức', 'group', <FaLayerGroup/>,listMenuItems.map(item => item.group===1 && (
            getItem(<NavLink to={item.link}>{item.name}</NavLink>, item.keyMenu, item.icon)
        ))
    )
    const groupProject= getItem('Dự Án', 'project', <FaProjectDiagram/>, listMenuItems.map(item => item.group===2 && (
            getItem(<NavLink to={item.link}>{item.name}</NavLink>, item.keyMenu, item.icon)
        ))
    )
    const groupCalendar=listMenuItems.map(item => item.group===0 && (
        getItem(<NavLink to={item.link}>{item.name}</NavLink>, item.keyMenu, item.icon)
    ))
    const listMenuDemos = [groupCompany,groupProject,...groupCalendar]
    const handleOnClick = (item) => {
        console.log(item)
        if (item.keyPath.length >= 2) {
            // Lấy khóa của submenu đó
            const subMenuKey = item.keyPath[1];
            localStorage.setItem('openKeys', JSON.stringify([subMenuKey]));
            setOpenKey([subMenuKey])
            console.log(`Submenu key: ${subMenuKey}`);
        } else {
            localStorage.setItem('openKeys', JSON.stringify([]));
            setOpenKey([])
        }
    }


    useEffect(() => {
        const savedOpenKeys = JSON.parse(localStorage.getItem('openKeys'));
        if (savedOpenKeys) {
            setOpenKey(savedOpenKeys);
        }
    }, []);

    function onOpenChange(keys) {
        localStorage.setItem('openKeys', JSON.stringify(keys));
        setOpenKey(keys);
    }

    return (
        <Sider collapsed={collapsed}
               className={`sidebar-version2 ${collapsed ? 'hide' : ''}`}
        >
            <div className={`side-bar-logo ${collapsed?'mini':''}`}                >
               <ImageCustom className={`img-company ${collapsed?'mini':''}`} src={imgCompany} alt={'Loggo'}/>
            </div>

            {
                isEmpty(userLogin) ?(<SidebarSkeleton collapsed={collapsed}/>):(
                    <Menu
                        openKeys={openKey}
                        onOpenChange={onOpenChange}
                        selectedKeys={location.pathname}
                        mode="inline"
                        theme="light"
                        items={listMenuDemos}
                    />
                )
            }

        </Sider>
    );
};
export default SideBarVersion2;