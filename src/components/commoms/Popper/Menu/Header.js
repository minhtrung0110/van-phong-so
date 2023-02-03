import { faCircleXmark, faSearch, faSpinner, faSign, faEllipsisVertical, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


function Header({title,onBack}) {
    return ( 
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
     );
}

export default Header;