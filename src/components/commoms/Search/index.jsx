import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FaSearch, FaTimes} from "react-icons/fa";
import './style.scss'
import {useDispatch} from "react-redux";
SearchCustom.propTypes = {

};

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
        <form action="" className={!!show && 'show'}>
            <div className="form-input">
                <input type="search" placeholder="Search..."/>
                <button type="submit" className="search-btn"
                onClick={e=>handleSearch(e)}>
                    {!isMobileSearchIcon ?(   <FaSearch className='bx bx-search' />):(<FaTimes className='bx bx-x' />)}
                </button>
            </div>
        </form>
    );
}

export default SearchCustom;