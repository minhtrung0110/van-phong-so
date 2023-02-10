import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Col, Row} from "antd";
DetailStaff.propTypes = {

};

function DetailStaff( {user}) {
    console.log(user)
    return (
        <div className='box-detail-staff' >
            <Row className='info-basic'>
                <Col className='box-avatar' xs={{ span: 24, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                    <img className='img' src={user.avatar} />
                </Col >
                <Col className='box-info' xs={{ span: 24, offset: 1 }} lg={{ span: 19, offset: 1 }}>

                </Col>
            </Row>
        </div>
    );
}

export default DetailStaff;