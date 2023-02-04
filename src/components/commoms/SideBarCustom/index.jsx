import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Menu} from "antd";
import {listMenuClientItems} from "~/asset/data/menu-client-item";
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router-dom";
import Company from '~/asset/images/logo.png'
import './style.scss'

SideBarCustom.propTypes = {

};

function SideBarCustom(props) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate=useNavigate();

    return (
        <section id="sidebar">
            <a href="#" className="brand">
                <i className='bx bxs-smile'></i>
                <span className="text">AdminHub</span>
            </a>
            <ul className="side-menu top">
                <li className="active">
                    <a href="#">
                        <i className='bx bxs-dashboard'></i>
                        <span className="text">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-shopping-bag-alt'></i>
                        <span className="text">My Store</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-doughnut-chart'></i>
                        <span className="text">Analytics</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-message-dots'></i>
                        <span className="text">Message</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bxs-group'></i>
                        <span className="text">Team</span>
                    </a>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#">
                        <i className='bx bxs-cog'></i>
                        <span className="text">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="logout">
                        <i className='bx bxs-log-out-circle'></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default SideBarCustom;