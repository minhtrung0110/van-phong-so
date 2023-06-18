import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './AvatarCustom.module.scss'
import classNames from "classnames/bind";
import {Avatar} from "antd";
import {isEmpty} from "lodash";
AvatarCustom.propTypes = {
    avatar: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};
const cx=classNames.bind(styles)
function AvatarCustom({avatar="http://",lastName="A",size='large'}) {
    const [show, setShow] = useState(false);
    const array = !isEmpty(lastName) ?lastName.split(" "):[];
    const name = lastName.charAt(0);
    const checkImageUrl = (url) => {
        // /\.(jpeg|jpg|png|gif)\b/i.test(url);
        let img = document.createElement('img');
        img.src = url;
        img.onload =  () => setShow(true)
        img.onerror = ()=> setShow(false)
    }
    checkImageUrl(avatar)
    return (
        <div className={cx('avatar-user')}>
            {
                !!show ? (<Avatar style={{backgroundColor: '#1d81ab', verticalAlign: 'middle'}} size={size}
                                       src={avatar} className={cx('avatar')}/>)
                    : (
                        <Avatar style={{backgroundColor: '#f56a00', verticalAlign: 'middle'}} size={size} className={cx('avatar')}>
                            {name}
                        </Avatar>
                    )
            }
        </div>
    );
}

export default AvatarCustom;