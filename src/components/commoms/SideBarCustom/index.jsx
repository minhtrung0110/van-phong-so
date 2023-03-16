import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Menu, Tooltip} from "antd";
import {listMenuClientItems, menu_client_items} from "~/asset/data/menu-client-item";
import Sider from "antd/es/layout/Sider";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Company from '~/asset/images/logo.png'
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import {FaBuilding, FaCogs, FaRegDotCircle} from "react-icons/fa";
import {config} from "~/config";

SideBarCustom.propTypes = {

};

function SideBarCustom(props) {
    const location=useLocation()
    const isCollapsed =useSelector(isCollapseSideBar)
    return (
        <section id="sidebar" className={`${!!isCollapsed && 'hide'}`}>
            <a href="~/layouts/Client/SideBarCustom/index#" className="brand">
                <FaBuilding className='bx ' />
                <span className="text">Admin</span>
            </a>
            <ul className="side-menu top">
                {
                    menu_client_items.map((item,index)=>(
                        // <Tooltip title={item.name} placement={"right"} color={'#479f87'} >
                            <li   className={`${item.link===location.pathname && 'active'}`} key={index}>
                                <NavLink to={item.link}

                                >
                                    <span className='bx'>{item.icon}</span>
                                    <span className="text">{item.name}</span>
                                </NavLink>
                            </li>
                        // </Tooltip>


                    ))
                }


            </ul>
            <ul className="side-menu">
                <li   className={`${config.routes.config===location.pathname && 'active'}`} >
                    <NavLink to={config.routes.config}

                    >
                        <span className='bx'><FaCogs/></span>
                        <span className="text">Cấu Hình</span>
                    </NavLink>
                </li>
            </ul>
        </section>
    );
}

export default SideBarCustom;