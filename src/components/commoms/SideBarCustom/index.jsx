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
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='sidebar'
               style={{
                 //  background: '#b5ddec',
               }}>
            <img src={Company} alt='logo' className='logo' />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={listMenuClientItems}
                  onClick={(value)=> navigate(value.key)}
                  style={{
                 //     background: '#75b7d0',
                  }}
            />
        </Sider>
    );
}

export default SideBarCustom;