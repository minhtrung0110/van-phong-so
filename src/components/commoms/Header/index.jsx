import React from 'react';
import PropTypes from 'prop-types';
import {Header} from "antd/es/layout/layout";
import BreadcrumbCustom from "~/components/commoms/BreadcrumbCustom";
import styles from './Header.module.scss'
import {FaBell,  FaUserCircle} from "react-icons/fa";
import classNames from "classnames/bind";
import InfoUser from "~/components/Client/InfoUser";

import './style.scss'

HeaderBar.propTypes = {

};
function HeaderBar(props) {
    const user={
        firstName: 'Le Pham',
        lastName: 'Tu',
        email: 'lephjamty@gmail.com',
        phone: '097544646',
        avatar: 'https://picsum.photos/200',
        role: 'Sale Person'
    }

    return (
        <>
            <nav className='navbar'>
                <i className='bx bx-menu'></i>
                <a href="#" className="nav-link">Categories</a>
                <form action="#">
                    <div className="form-input">
                        <input type="search" placeholder="Search..."/>
                            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                    </div>
                </form>
                <input type="checkbox" id="switch-mode" hidden/>
                    <label htmlFor="switch-mode" className="switch-mode"></label>
                    <a href="#" className="notification">
                        <i className='bx bxs-bell'></i>
                        <span className="num">8</span>
                    </a>
                    <a href="#" className="profile">
                        <img src="img/people.png"/>
                    </a>
            </nav>
        </>
    );
}

export default HeaderBar;