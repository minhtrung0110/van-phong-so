import React from 'react';
import PropTypes from 'prop-types';
import styles   from './SearchHideButton.module.scss'
import classNames from "classnames/bind";

SearchHidenButton.propTypes = {
    height:PropTypes.string,
    width: PropTypes.string,
    backgroundButton: PropTypes.string,
};
const cx=classNames.bind(styles)
function SearchHidenButton({height, width,backgroundButton,searchButtonText,className}) {
    const handleSearch=(e)=>{
        e.preventDefault();
    }
    return (
        <div className={cx('search-selection',className)}        >
            <form onSubmit={(e)=>handleSearch()} role="search" className={cx('form-search')}
                  style={{ width: width , backgroundColor:backgroundButton}}
            >
                <label htmlFor="search" className={cx('label-search')}>Search for stuff</label>
                <input id="search" type="search" placeholder="Tìm..." autoFocus required className={cx('input-search')}
                       style={{ height: height }}
                />
                <button type="submit" className={cx('btn-search')}
                        style={{ height: height, backgroundColor:backgroundButton  }}
                >{!!searchButtonText?searchButtonText:'Tìm'}</button>
            </form>
        </div>
    );
}

export default SearchHidenButton;