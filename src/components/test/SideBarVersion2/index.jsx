
import { Button, Menu } from 'antd';
import { useState } from 'react';
import {
    FaBars,
    FaBuilding,
    FaCalendar,
    FaDesktop,
    FaFacebookMessenger,
    FaHome, FaLaptop,
    FaPeopleArrows,
    FaTasks
} from "react-icons/fa";
import {useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import './style.scss'
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router-dom";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
export  const listMenuClientItems=[
    getItem('Công Việc', '/task', <FaTasks />,),
    getItem('Lịch Biểu', '/schedule', <FaCalendar />),
    getItem('Cuộc Họp', '/communication', <FaFacebookMessenger />, [
        getItem('Tin Nhắn', '/communication/mess'),
        getItem('Họp', '/communication/meeting'),
    ]),
    getItem('Nhân Sự', '/staff', <FaPeopleArrows />, ),
    getItem('Văn Phòng Phẩm', '/stationery', <FaLaptop />),
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