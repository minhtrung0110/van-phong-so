import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownNotify.module.scss'
import classNames from "classnames/bind";
import {FaBell} from "react-icons/fa";
import {config} from "~/config";
import {NavLink} from "react-router-dom";

DropdownNotify.propTypes = {};
const cx = classNames.bind(styles)

function DropdownNotify(props) {
    const listNotifies = [
        {
            id: 1,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 2,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 3,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 4,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 5,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 6,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        },
        {
            id: 7,
            title: 'Lich Làm Việc Tuần 8',
            description: 'Hop Giao Ban',
            image: 'https://www.gannett-cdn.com/-mm-/51932f63609cbba284fa13232e749b463be53a48/c=2-0-749-422/local/-/media/2018/05/02/TreasureCoast/TreasureCoast/636608798020779494-0509-ynsl-hurston-lib-word-training.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',

        }
    ]
    const listRef=useRef();
    const [isCroll,setIsCroll] =useState(false)
    useEffect(() => {
        listRef.current.addEventListener('scroll', handleScroll);
        return () =>  listRef.current.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        setIsCroll(true)
    };
    return (
        <div className={cx("notification")}>
            <FaBell className='bx bxs-bell'/>
            <span className={cx("num")}>8</span>
            <div className={cx("list__notify")}>
                <header className={cx("list__notify-header")}>
                    <h3>Thông báo mới nhận</h3>
                </header>
                <ul className={cx("list__notify-list",`${isCroll ? 'scrolled':''}`)} ref={listRef}>
                    {listNotifies.map((item, index) => (
                        <li className={cx("list__notify-item")} key={item.id}>
                            <a href="" className={cx("list__notify-link")}>
                                <img src={item.image} alt={item.title} className={cx("list__notify-img")}/>
                                <div className={cx("list__notify-info")}>
                                                <span className={cx("list__notify-name")}>
                                                    {item.title}
                                                </span>
                                    <span className={cx("list__notify-desc")}>
                                                {item.description}
                                                </span>
                                </div>
                            </a>
                        </li>
                    ))}

                </ul>
                <footer className={cx("list__notify-footer")}>
                    <NavLink to={config.routes.notification} className={cx("list__notify-footer-btn")}>Xem tất cả</NavLink>
                </footer>
            </div>
        </div>

    );
}

export default DropdownNotify;

// <li className={cx("list__notify-item","list__notify-item--viewed")}>
//     <a href="" className={cx("list__notify-link")}>
//         <img src="./assets/img/hoodie-cute.jpg" alt="" className={cx("list__notify-img")}/>
//         <div className={cx("list__notify-info")}>
//                                                 <span className={cx("list__notify-name")}>
//                                                     Người yêu chính hãng
//                                                 </span>
//             <span className={cx("list__notify-desc")}>
//                                                     - 100% làm từ hàng thật
//                                                 </span>
//         </div>
//     </a>
// </li>