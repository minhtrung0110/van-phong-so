import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "antd";
import './style.scss'
import Avatar from "react-avatar-edit";
import BoxAvatar from "~/components/Client/Profile/BoxAvatar";
Profile.propTypes = {

};

function Profile(props) {
    return (
        <Row className='container-user'>
            <BoxAvatar />
            <Col className='box-info box' span={14}>

            </Col>
            <Col className='box-social box' span={22}>

            </Col>
        </Row>
    );
}

export default Profile;