import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb, Layout, Menu, theme} from "antd";
import {listMenuClientItems} from "~/asset/data/menu-client-item";
import Header from "~/components/commoms/Header";
import HeaderBar from "~/components/commoms/Header";
import SideBarCustom from "~/components/commoms/SideBarCustom";
import BreadcrumbCustom from "~/components/commoms/BreadcrumbCustom";

ClientLayout.propTypes = {
    slot: PropTypes.element.isRequired,
};
const {Content, Footer, Sider} = Layout;


function ClientLayout({slot}) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBarCustom/>
            <Layout className="site-layout">
                <HeaderBar/>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >


                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {/*Content */}
                        {
                            slot
                        }
                    </div>
                </Content>

                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ClientLayout;