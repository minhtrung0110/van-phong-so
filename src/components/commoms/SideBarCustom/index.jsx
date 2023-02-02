import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Menu} from "antd";
import {listMenuClientItems} from "~/asset/data/menu-client-item";
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router-dom";

SideBarCustom.propTypes = {

};

function SideBarCustom(props) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate=useNavigate();

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={listMenuClientItems}
                  onClick={(value)=> navigate(value.key)}

            />
        </Sider>
    );
}

export default SideBarCustom;