import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SideBarCustom from "~/components/commoms/SideBarCustom";
import HeaderBar from "~/components/commoms/Header";
import './style.scss'
import {config} from "~/config";
import HeaderContent from "~/components/commoms/HeaderContent";

ClientLayout.propTypes = {
    slot: PropTypes.element.isRequired,
}


function ClientLayout({slot}) {

//style={{background:`${config.backgroundColors.mainColor}`}}

    return (
        <>
            <SideBarCustom/>
            <section id="content">

                <HeaderBar/>
                <main>

                    {slot}
                </main>
            </section>
        </>
    )
}

export default ClientLayout;