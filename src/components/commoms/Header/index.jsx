import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaAngleDown, FaBars, FaFlipboard, FaPager, FaSignOutAlt, FaUser,} from "react-icons/fa";
import classNames from "classnames/bind";
import InfoUser from "~/components/commoms/InfoUser";

import './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import {setCollapseSideBar} from "~/redux/reducer/dashboard/dashboardReducer";
import {useLocation} from "react-router-dom";
import {dataConvertBreadcrumbLanguage} from "~/asset/data/data-convert-breadcrumb-language";
import SearchCustom from "~/components/commoms/Search";
import DropdownNotify from "~/components/commoms/DropdownNotify";
import styles from './Header.module.scss'
import {Dropdown} from "antd";
import SelectHeaderProject from "~/components/commoms/SelectHeaderProject";

HeaderBar.propTypes = {};

const cx = classNames.bind(styles)

function HeaderBar({onCollapse}) {
    const user = {
        firstName: 'Nguyen Duc Minh',
        lastName: 'Trung',
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

//Handle Logic


    return (
        <>
            <nav className={cx('navbar')}>
                <div className={cx('box-info-context')}>
                    <FaBars className={cx('bx-menu')} onClick={() => dispatch(setCollapseSideBar(!isCollapsed))}/>
                    <span className={cx("nav-link")}>{
                        dataConvertBreadcrumbLanguage.find((item) => (item.href === location.pathname)).label
                    }</span>
                   <SelectHeaderProject/>
                </div>
                {/*<SearchCustom/>*/}

                <div className={cx('box-config')}>
                    <input type="checkbox" id="switch-mode" hidden onChange={(e) => handleSwitchMode(e)}/>
                    <label htmlFor="switch-mode" className={cx("switch-mode")}></label>
                    <DropdownNotify/>

                    <InfoUser firstName={user.firstName} lastName={user.lastName} role={user.role}
                              email={user.email} avatar={user.avatar}/>
                </div>


            </nav>
        </>
    );
}

export default HeaderBar;