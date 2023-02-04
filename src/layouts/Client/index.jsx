import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SideBarCustom from "~/components/commoms/SideBarCustom";
import HeaderBar from "~/components/commoms/Header";
import {useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";

ClientLayout.propTypes = {
    slot: PropTypes.element.isRequired,
}


function ClientLayout({slot}) {



    return (
        <>
            <SideBarCustom />
            <section id="content">

                    <HeaderBar  />
                <main>
                    {slot}
                </main>
            </section>
        </>
    )
}

export default ClientLayout;