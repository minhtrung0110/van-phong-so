import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SideBarCustom from "~/layouts/Client/SideBarCustom";
import HeaderBar from "~/layouts/Client/Header";
import './style.scss'

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