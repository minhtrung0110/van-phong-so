import React from 'react';
import PropTypes from 'prop-types';
import styles   from './SearchSelection.module.scss'
import classNames from "classnames/bind";

SearchSelection.propTypes = {

};
const cx=classNames.bind(styles)
function SearchSelection(props) {
    return (
        <div className={cx('search-selection')}>
            <form onSubmit="event.preventDefault();" role="search">
                <label htmlFor="search">Search for stuff</label>
                <input id="search" type="search" placeholder="Tìm..." autoFocus required/>
                <button type="submit">Tìm</button>
            </form>
        </div>
    );
}

export default SearchSelection;