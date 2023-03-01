import React from 'react';
import PropTypes from 'prop-types';
import SideBarCustom from "~/components/commoms/SideBarCustom";
import HeaderBar from "~/components/commoms/Header";
import HeaderContent from "~/components/commoms/HeaderContent";

ClientLayoutHasHeaderContent.propTypes = {

};

function ClientLayoutHasHeaderContent({slot}) {
    return (
        <>
            <SideBarCustom/>
            <section id="content">

                <HeaderBar/>
                <HeaderContent/>
                <main>

                    {slot}
                </main>
            </section>
        </>
    );
}

export default ClientLayoutHasHeaderContent;