import {
    FaCalendar,
    FaFacebookMessenger,
    FaFile, FaLaptop, FaPeopleArrows,
    FaTasks,
    FaTeamspeak,
} from "react-icons/fa";
import React from "react";
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