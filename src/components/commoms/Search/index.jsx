import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FaSearch, FaTimes} from "react-icons/fa";
import './Search.module.scss'
import styles from './Search.module.scss'
import classNames from "classnames/bind";
SearchCustom.propTypes = {

};
const cx=classNames.bind(styles)
function SearchCustom(props) {

    const [show,setShow]=useState(false)
    const [isMobileSearchIcon,setIsMobileSearchIcon]=useState(false)

    const handleSearch = (e)=>{
        if(window.innerWidth < 576) {
            e.preventDefault();
            setShow(!show)
            if(show) {
               setIsMobileSearchIcon(false)
            } else {
                setIsMobileSearchIcon(true)
            }
        }
    }
    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth > 576)         setIsMobileSearchIcon(false)
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return (
        <form action="" className={cx('search-custom',!!show && 'show')}>
            <div className={cx("form-input")}>
                <input type="search" placeholder="Search..." className={cx('input-search')}/>
                <button type="submit" className={cx("search-btn")}
                onClick={e=>handleSearch(e)}>
                    {!isMobileSearchIcon ?(   <FaSearch className='bx bx-search' />):(<FaTimes className='bx bx-x' />)}
                </button>
            </div>
        </form>
    );
}

export default SearchCustom;