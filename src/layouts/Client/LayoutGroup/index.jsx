import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SideBarCustom from "~/components/commoms/SideBarCustom";
import HeaderBar from "~/components/commoms/Header";
import './style.scss'
import {config} from "~/config";
import HeaderContent from "~/components/commoms/HeaderContent";
import SideBarVersion2 from "~/components/test/SideBarVersion2";
import {menu_home_client_items} from "~/asset/data/menu-client-item";
import {NavLink} from "react-router-dom";

LayoutGroup.propTypes = {
    slot: PropTypes.element.isRequired,
}


function LayoutGroup({slot}) {

//style={{background:`${config.backgroundColors.mainColor}`}}

    return (
        <>
            <SideBarCustom/>
            {/*<SideBarVersion2 />*/}
            <section id="content">
                <HeaderBar/>
                <main className={'main-layout-group'}>
                    <div className="sub-sidebar">
                        <ul className="side-menu top">
                            {
                                menu_home_client_items.map((item,index)=>(
                                    // <Tooltip title={item.name} placement={"right"} color={'#479f87'} >
                                    <li   key={index} className={'nav-item'}>
                                        <NavLink to={item.link}               >
                                            <span className='bx'>{item.icon}</span>
                                            <span className="text">{item.name}</span>
                                        </NavLink>
                                    </li>
                                    // </Tooltip>


                                ))
                            }

                        </ul>
                    </div>
                    <div className="content">
                        {slot}
                    </div>

                </main>
            </section>
        </>
    )
}

export default LayoutGroup;