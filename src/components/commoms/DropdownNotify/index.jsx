import React from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownNotify.module.scss'
import classNames from "classnames/bind";
import {FaBell} from "react-icons/fa";
import {config} from "~/config";

DropdownNotify.propTypes = {};
const cx = classNames.bind(styles)

function DropdownNotify(props) {
    const listNotifies = [
        {
            id: 1,
            title: 'Messi is G.O.A.T',
            description: 'Lalaland',
            image: 'https://1.bp.blogspot.com/-rIZvGHdH8L8/YUxNVBj8pEI/AAAAAAABShY/GeiNuNIh0r84QPPfZgAHZUwcsRT64gbaQCLcBGAsYHQ/s0/BaoBua-CoM-FONGBEER-1.jpg',

        },
        {
            id: 2,
            title: 'Messi is G.O.A.T',
            description: 'Lalaland',
            image: 'https://1.bp.blogspot.com/-rIZvGHdH8L8/YUxNVBj8pEI/AAAAAAABShY/GeiNuNIh0r84QPPfZgAHZUwcsRT64gbaQCLcBGAsYHQ/s0/BaoBua-CoM-FONGBEER-1.jpg',

        },
        {
            id: 3,
            title: 'Messi is G.O.A.T',
            description: 'Lalaland',
            image: 'https://1.bp.blogspot.com/-rIZvGHdH8L8/YUxNVBj8pEI/AAAAAAABShY/GeiNuNIh0r84QPPfZgAHZUwcsRT64gbaQCLcBGAsYHQ/s0/BaoBua-CoM-FONGBEER-1.jpg',

        },
        {
            id: 4,
            title: 'Messi is G.O.A.T',
            description: 'Lalaland',
            image: 'https://1.bp.blogspot.com/-rIZvGHdH8L8/YUxNVBj8pEI/AAAAAAABShY/GeiNuNIh0r84QPPfZgAHZUwcsRT64gbaQCLcBGAsYHQ/s0/BaoBua-CoM-FONGBEER-1.jpg',

        }
    ]
    return (
        <div className={cx("notification")}>
            <FaBell className='bx bxs-bell'/>
            <span className={cx("num")}>8</span>
            <div className={cx("list__notify")}>
                <header className={cx("list__notify-header")}>
                    <h3>Thông báo mới nhận</h3>
                </header>
                <ul className={cx("list__notify-list")}>
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
                    <a href={config.routes.notification} className={cx("list__notify-footer-btn")}>Xem tất cả</a>
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