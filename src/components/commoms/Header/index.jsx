import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Header} from "antd/es/layout/layout";
import BreadcrumbCustom from "~/components/commoms/BreadcrumbCustom";
import styles from './Header.module.scss'
import {FaBars, FaBell, FaPager, FaSearch, FaSignOutAlt, FaUser, FaUserCircle} from "react-icons/fa";
import classNames from "classnames/bind";
import InfoUser from "~/components/Client/InfoUser";

import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import {setCollapseSideBar} from "~/redux/reducer/dashboard/dashboardReducer";
import {useLocation} from "react-router-dom";
import {dataConvertBreadcrumbLanguage} from "~/asset/data/data-convert-breadcrumb-language";
import SearchCustom from "~/components/commoms/Search";
import DropdownNotify from "~/components/commoms/DropdownNotify";
import Menu from "~/components/commoms/Popper/Menu";

HeaderBar.propTypes = {};

function HeaderBar({onCollapse}) {
    const user = {
        firstName: 'Le Pham',
        lastName: 'Tu',
        email: 'lephjamty@gmail.com',
        phone: '097544646',
        avatar: 'https://picsum.photos/200',
        role: 'Sale Person'
    }
    const isCollapsed = useSelector(isCollapseSideBar)
    const dispatch = useDispatch();
    const location = useLocation();
    const handleSwitchMode = (e) => {
        if (e.target.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    const userMenu = [
        {
            icon: <FaUser />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FaPager  />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FaSignOutAlt />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
//Handle Logic


    return (
        <>
            <nav className='navbar'>
                <FaBars className=' bx-menu' onClick={() => dispatch(setCollapseSideBar(!isCollapsed))}/>
                <span className="nav-link">{
                    dataConvertBreadcrumbLanguage.find((item) => ('/'.concat(item.href) === location.pathname)).label
                }</span>
                <SearchCustom/>
                <input type="checkbox" id="switch-mode" hidden onChange={(e) => handleSwitchMode(e)}/>
                <label htmlFor="switch-mode" className="switch-mode"></label>
                <DropdownNotify/>

                   <InfoUser firstName={user.firstName} lastName={user.lastName} role={user.role}
                             email={user.email} avatar={user.avatar}/>


            </nav>
        </>
    );
}

export default HeaderBar;