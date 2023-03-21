import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InfoUser.module.scss'
import classNames from "classnames/bind";
import ImgAvatar from "~/asset/images/avatar_user.png"
import {Avatar, Button, Divider, Dropdown, Space} from "antd";
import {FaExpand, FaLock, FaPager, FaSignOutAlt, FaUser} from "react-icons/fa";
import Menu from "~/components/commoms/Popper/Menu";
import {config} from "~/config";
import checkErrorImage from "~/utils/validateImage";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import './customDropdown.scss'
import {NavLink} from "react-router-dom";
InfoUser.propTypes = {
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

const cx = classNames.bind(styles);

function InfoUser({firstName, lastName, email, role, avatar}) {
    const [showImage, setShowImage] = useState(false);
    const checkImageUrl = (url) => {
        // /\.(jpeg|jpg|png|gif)\b/i.test(url);
        let img = document.createElement('img');
        img.src = url;
        img.onload = () => setShowImage(true)
        img.onerror = () => setShowImage(false)
    }
   // checkImageUrl(avatar)
    const userMenu = [
        {
            icon: <FaLock/>,
            title: 'Đổi Mật Khẩu',
            to: config.routes.changePassword,
        },
        {
            icon: <FaSignOutAlt/>,
            title: 'Đăng Xuất',
            to: '/logout',
            separate: true,
        },
    ];
    const items = [
        {
            key: '1',
            label: (
                  <div className={cx('info-user')}>
                      <div className={cx('title')}>Tài Khoản</div>
                      <div className={cx('info')}>
                          <AvatarCustom avatar={avatar} lastName={lastName} size={'default'}/>
                          <div className={cx('gr')}>
                              <span  className={cx('name')}>{`${firstName} ${lastName}`}</span>
                              <span className={cx('role')} >{`${role} `}</span>
                          </div>
                      </div>

                  </div>
            ),
        },
        {
            key: '2',
            label: (
                  <NavLink className={cx('dropdown-item')} to={config.routes.changePassword}>
                      <FaLock className={cx('dropdown-icon')} />
                      <span className={cx('dropdown-title')}>Đổi Mật Khẩu</span>
                  </NavLink>
            ),
        },
        {
            key: '3',
            label: (
                    <NavLink className={cx('dropdown-item')} to={config.routes.logout}>
                        <FaSignOutAlt className={cx('dropdown-icon')} />
                        <span className={cx('dropdown-title')}>Đăng Xuất</span>

                    </NavLink>

            ),
        },
    ];
    const contentStyle = {
        backgroundColor: "#fff",
        borderRadius: '3px',

    };
    const menuStyle = {
        boxShadow: 'none',
    };
    //console.log('check Image',checkErrorImage(avatar))
    return (
        // <Menu   items={ userMenu} hideOnClick={false}>
        // <div className={cx('box-user')}>
        //    <AvatarCustom avatar={avatar} lastName={lastName} />
        //
        // </div>
        // </Menu>
        <Dropdown
            menu={{
                items,
            }}
            className={cx('avatar-header')}
            overlayClassName={cx('box-user','custom-dropdown')}
            trigger={['click']}

        >
            <div className={cx('box-user')}>
                <AvatarCustom avatar={avatar} lastName={lastName}/>
            </div>
        </Dropdown>
    );
}

export default InfoUser;

//className={cx('')}