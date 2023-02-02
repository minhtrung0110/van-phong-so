import React from 'react';
import PropTypes from 'prop-types';
import {Header} from "antd/es/layout/layout";
import BreadcrumbCustom from "~/components/commoms/BreadcrumbCustom";
import styles from './Header.module.scss'
import {FaBell,  FaUserCircle} from "react-icons/fa";
import classNames from "classnames/bind";
import InfoUser from "~/components/Client/InfoUser";
HeaderBar.propTypes = {

};
const cx = classNames.bind(styles);
function HeaderBar(props) {
    const user={
        firstName: 'Le Pham',
        lastName: 'Tu',
        email: 'lephjamty@gmail.com',
        phone: '097544646',
        avatar: 'https://picsum.photos/200',
        role: 'Sale Person'
    }
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
                            <div className={cx('icon-noti')} data-notify={10}>
                                <FaBell className={cx('icon')} data-notify={10} />
                            </div>
                            <span className={cx('separator')}></span>
                        </div>
                          <InfoUser firstName={user.firstName} lastName={user.lastName}
                                    email={user.email} role={user.role} avatar={user.avatar} />
                    </div>
                </div>
            </Header>
        </>
    );
}

export default HeaderBar;