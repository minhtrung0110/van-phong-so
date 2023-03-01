import {
    FaBuilding,
    FaCalendar,
    FaFacebookMessenger, FaHome, FaTasks, FaUsers,
} from "react-icons/fa";
import React from "react";
import {config} from "~/config";

export const menu_client_items = [
    {
        id: 1,
        name: 'Overview',
        active: true,
        link: config.routes.overview,
        icon: <FaHome />,
        role: 1,
    },
    {
        id: 2,
        name: 'Công Việc ',
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
    {
        id: 6,
        name: 'Họp',
        active: false,
        link:  config.routes.meeting,
        icon: <FaFacebookMessenger />,
        role: 5,
    },


];
