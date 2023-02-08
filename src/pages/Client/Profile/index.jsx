import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "antd";
import './style.scss'
import Avatar from "react-avatar-edit";
import BoxAvatar from "~/components/Client/Profile/BoxAvatar";
import BoxInfo from "~/components/Client/Profile/BoxInfo";
import BoxSocial from "~/components/Client/Profile/BoxSocial";
Profile.propTypes = {

};

function Profile(props) {
    return (
        <Row className='container-user'>
            <Col className='avatar-social'  xs={{ span: 24, offset: 1 }} lg={{ span: 7, offset: 1 }}>
                <BoxAvatar />
                <BoxSocial />

            </Col>
            <BoxInfo />

        </Row>
    );
}

export default Profile;