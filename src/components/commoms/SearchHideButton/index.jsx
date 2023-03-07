import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles   from './SearchHideButton.module.scss'
import classNames from "classnames/bind";

SearchHidenButton.propTypes = {
    height:PropTypes.string,
    width: PropTypes.string,
    backgroundButton: PropTypes.string,
};
const cx=classNames.bind(styles)
function SearchHidenButton({height, width,backgroundButton,searchButtonText,className,onSearch}) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchValue);
    };
    return (
        <div className={cx('search-selection',className)}        >
            <form onSubmit={(e)=>handleSearch()} role="search" className={cx('form-search')}
                  style={{ width: width , backgroundColor:backgroundButton}}
            >
                <label htmlFor="search" className={cx('label-search')}>Search for stuff</label>
                <input id="search" type="search" placeholder="Tìm..." autoFocus required className={cx('input-search')}
                       value={searchValue}
                       onChange={(e)=>setSearchValue(e.target.value)}
                       style={{ height: height }}
                />
                <button type="submit" className={cx('btn-search')}
                        style={{ height: height, backgroundColor:backgroundButton  }}
                        onClick={handleSearch}
                >{!!searchButtonText?searchButtonText:'Tìm'}</button>
            </form>
        </div>
    );
}

export default SearchHidenButton;