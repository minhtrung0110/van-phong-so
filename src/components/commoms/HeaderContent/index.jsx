import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderContent.module.scss'
import classNames from "classnames/bind";
import {FaUsers} from "react-icons/fa";
HeaderContent.propTypes = {

};
const cx=classNames.bind(styles)
function HeaderContent({title,slot}) {
    return (
        <div className={cx('header-content')}>
            <div className={cx('header-left')}>
                <div className={cx('title')}>
                    <FaUsers className={cx('icon')}/>
                    <h4>{title}</h4>
                </div>
            </div>
            <div className={cx('header-right')}></div>
        </div>
    );
}

export default HeaderContent;