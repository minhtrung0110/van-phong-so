import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "antd";
import styles from './ChangedPassword.module.scss'
import classNames from "classnames/bind";
ChangedPassword.propTypes = {

};
const cx=classNames.bind(styles)
function ChangedPassword({isOpen,onOk,onCancel,}) {
    return (

           <div className={cx('form-changed-password')}>

           </div>
    );
}

export default ChangedPassword;