import { Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    FaCalendar, FaCogs,
    FaHome, FaLaptop, FaLayerGroup, FaNewspaper,
    FaPeopleArrows,
    FaTasks, FaUserCog
} from "react-icons/fa";
import {useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import './style.scss'
import Sider from "antd/es/layout/Sider";
import {NavLink, useLocation,} from "react-router-dom"
import {config} from "~/config";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export const listMenuClientItems = [
    getItem('Tổ Chức', 'group', <FaLayerGroup/>, [
            getItem(<NavLink to={config.routes.home}>Bảng Tin</NavLink>, config.routes.home, <FaHome/>),
            getItem(<NavLink to={config.routes.post}>Bài Viết</NavLink>, config.routes.post, <FaNewspaper/>),
            getItem(<NavLink to={config.routes.staff}>Nhân Sự</NavLink>, config.routes.staff, <FaPeopleArrows/>),
            getItem(<NavLink to={config.routes.department}>Phòng Ban</NavLink>, config.routes.department, <FaLaptop/>),
            getItem(<NavLink to={config.routes.decentralize}>Phân Quyền</NavLink>, config.routes.decentralize,
                <FaUserCog/>),
            getItem(<NavLink to={config.routes.setting}>Cài Đặt</NavLink>, config.routes.setting, <FaCogs/>),
        ]
    ),
    getItem(<NavLink to={config.routes.allProject}>Dự Án</NavLink>, config.routes.allProject, <FaTasks/>),
    getItem(<NavLink to={config.routes.schedule}>Lịch Biểu</NavLink>, config.routes.schedule, <FaCalendar/>),


];
const SideBarVersion2 = () => {
    const location = useLocation();
    const collapsed = useSelector(isCollapseSideBar)
    const [openKey, setOpenKey] = useState(['group']);
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
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                openKeys={openKey}
                onOpenChange={onOpenChange}
                selectedKeys={location.pathname}
                mode="inline"
                theme="light"
                items={listMenuClientItems}
            />

        </Sider>
    );
};
export default SideBarVersion2;