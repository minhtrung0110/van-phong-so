
import { Button, Menu } from 'antd';
import { useState } from 'react';
import {
    FaBars,
    FaBuilding,
    FaCalendar, FaCogs,
    FaDesktop,
    FaFacebookMessenger,
    FaHome, FaLaptop, FaNewspaper,
    FaPeopleArrows,
    FaTasks, FaUserCog
} from "react-icons/fa";
import {useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import './style.scss'
import Sider from "antd/es/layout/Sider";
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import { history } from 'react-router-dom';
import {config} from "~/config";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
export  const listMenuClientItems=[
    getItem( <NavLink to={config.routes.home}>Tổ Chức</NavLink>, config.routes.home, <FaHome />,[
            getItem( <NavLink to={config.routes.post}>Bài Viết</NavLink>, config.routes.post, <FaNewspaper />),
            getItem( <NavLink to={config.routes.staff}>Nhân Sự</NavLink>, config.routes.staff, <FaPeopleArrows />),
            getItem( <NavLink to={config.routes.department}>Phòng Ban</NavLink>, config.routes.department, <FaLaptop />),
        getItem( <NavLink to={config.routes.decentralize}>Phân Quyền</NavLink>, config.routes.decentralize, <FaUserCog/>),
        getItem( <NavLink to={config.routes.setting}>Cài Đặt</NavLink>, config.routes.setting, <FaCogs />),
        ]
    ),
    getItem( <NavLink to={config.routes.project}>Dự Án</NavLink>, config.routes.project, <FaTasks />),
    getItem( <NavLink to={config.routes.schedule}>Lịch Biểu</NavLink>, config.routes.schedule, <FaCalendar/>),


];
const SideBarVersion2 = () => {
    // const [collapsed, setCollapsed] = useState(false);
    // const toggleCollapsed = () => {
    //     setCollapsed(!collapsed);
    // };
    const collapsed=useSelector(isCollapseSideBar)
    const handleonClick=(item)=>{
        console.log(item)

    //   useNavigate(item.key)
    }
    const location=useLocation();
    return (
        <Sider  collapsed={collapsed}
               className={`sidebar-version2 ${collapsed?'hide':''}`}
        >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                selectedKeys={location.pathname}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                onClick={handleonClick}
                inlineCollapsed={collapsed}
                items={listMenuClientItems}
            />

        </Sider>
          );
};
export default SideBarVersion2;