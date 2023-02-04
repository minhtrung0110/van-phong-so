import {
    FaCalendar,
    FaFacebookMessenger, FaHome, FaTasks, FaUsers,
} from "react-icons/fa";
import React from "react";

export const menu_client_items = [
    {
        id: 1,
        name: 'Overview',
        active: true,
        link: '/',
        icon: <FaHome />,
        role: 1,
    },
    {
        id: 2,
        name: 'Công Việc ',
        active: false,
        link: '/task',
        icon: <FaTasks />,
        role: 2,
    },
    {
        id: 3,
        name: 'Lịch Biểu',
        active: false,
        link: '/schedule',
        icon: <FaCalendar />,
        role: 3,
    },
    {
        id: 4,
        name: 'Nhân Sự',
        active: false,
        link: '/staff',
        icon: <FaUsers />,
        role: 4,
    },
    {
        id: 5,
        name: 'Họp',
        active: false,
        link: '/meeting',
        icon: <FaFacebookMessenger />,
        role: 5,
    },


];
