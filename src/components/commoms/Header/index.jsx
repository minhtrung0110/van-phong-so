import React from 'react';
import PropTypes from 'prop-types';
import {Header} from "antd/es/layout/layout";
import BreadcrumbCustom from "~/components/commoms/BreadcrumbCustom";
import styles from './Header.module.scss'
import {FaBell,  FaUserCircle} from "react-icons/fa";
import classNames from "classnames/bind";
HeaderBar.propTypes = {

};
const cx = classNames.bind(styles);
function HeaderBar(props) {

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background:'#efefef',
                }}

            >
                <div className={cx('container-header')}>
                    <BreadcrumbCustom />
                    <div className={cx('box')}>
                        <div className={cx('notification')}>

                            <span className={cx('badge')}>12</span>
                            <FaBell className={cx('icon-noti')} />
                        </div>
                        <div className={cx('info-user')}>
                            <FaUserCircle className={cx('icon-user')} />

                        </div>
                    </div>
                </div>
            </Header>
        </>
    );
}

export default HeaderBar;