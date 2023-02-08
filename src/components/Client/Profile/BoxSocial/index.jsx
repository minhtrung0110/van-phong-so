import React from 'react';
import PropTypes from 'prop-types';
import {Col} from "antd";
import './style.scss'
import {FaFacebook, FaInstagram} from "react-icons/fa";
BoxSocial.propTypes = {

};

function BoxSocial(props) {
    return (
        <div className='box-social box' >
            <div className='tb-social'>
                <a className='row-item'>
                    <div className='icons'>
                        <FaFacebook />
                        <span className='title'>Facebook</span>

                    </div>
                    <div className='user'>Teo</div>
                </a>
                <a className='row-item'>
                    <div className='icons'><FaInstagram /></div>
                    <div className='user'>CoLu</div>
                </a>
            </div>
        </div>
    );
}

export default BoxSocial;