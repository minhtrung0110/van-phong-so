import {
    FaBuilding,
    FaCalendar,
    FaFacebookMessenger, FaHome, FaLaptop, FaPeopleArrows, FaTasks, FaUsers,
} from "react-icons/fa";
import React from "react";
import {config} from "~/config";

export const menu_client_items = [
    {
        id: 1,
        name: 'Tổng Quan',
        active: true,
        link: config.routes.overview,
        icon: <FaHome />,
        role: 1,
    },
    {
        id: 2,
        name: 'Dự Án ',
        active: false,
        link: config.routes.task,
        icon: <FaTasks />,
        role: 2,
    },
    {
        id: 3,
        name: 'Lịch Biểu',
        active: false,
        link:  config.routes.schedule,
        icon: <FaCalendar />,
        role: 3,
    },
    {
        id: 4,
        name: 'Nhân Sự',
        active: false,
        link:  config.routes.staff,
        icon: <FaUsers />,
        role: 4,
    },
    {
        id: 5,
        name: 'Phòng Ban',
        active: false,
        link:  config.routes.department,
        icon: <FaBuilding/>,
        role: 4,
    },
   


];
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
export  const listMenuClientItems=[
    getItem('Công Việc', config.routes.task, <FaTasks />,),
    getItem('Lịch Biểu', config.routes.meeting, <FaCalendar />),
    getItem('Cuộc Họp', '/communication', <FaFacebookMessenger />, [
        getItem('Tin Nhắn', '/communication/mess'),
        getItem('Họp', '/communication/meeting'),
    ]),
    getItem('Nhân Sự', '/staff', <FaPeopleArrows />, ),
    getItem('Văn Phòng Phẩm', '/stationery', <FaLaptop />),
];
