import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InfoUser.module.scss'
import classNames from "classnames/bind";
import ImgAvatar from "~/asset/images/avatar_user.png"
import {Avatar} from "antd";
import {FaPager, FaSignOutAlt, FaUser} from "react-icons/fa";
import Menu from "~/components/commoms/Popper/Menu";
import {config} from "~/config";

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
        img.onload =  () => setShowImage(true)
        img.onerror = ()=> setShowImage(false)
    }
    checkImageUrl(avatar)
    const userMenu = [
        {
            icon: <FaUser />,
            title: 'Cài Đặt',
            to:  config.routes.profile,
        },
        {
            icon: <FaPager  />,
            title: 'Mở Rộng',
            to: '/expand',
        },
        {
            icon: <FaSignOutAlt />,
            title: 'Đăng Xuất',
            to: '/logout',
            separate: true,
        },
    ];
    return (
        <Menu   items={ userMenu} hideOnClick={false}>
        <div className={cx('box-user')}>
            {
                !!showImage ? (<Avatar style={{backgroundColor: '#1d81ab', verticalAlign: 'middle'}} size="large"
                                       src={avatar} className={cx('avatar')}/>)
                    : (
                    <Avatar style={{backgroundColor: '#f56a00', verticalAlign: 'middle'}} size="large" className={cx('avatar')}>
                        {lastName}
                    </Avatar>
                )
            }
            <div className={cx('info')}>
                <span className={cx('name')}>{`${firstName} ${lastName}`}</span>
                <span className={cx('role')}>{role}</span>
            </div>

        </div>
        </Menu>
    );
}

export default InfoUser;

//className={cx('')}