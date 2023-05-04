import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelectKey.module.scss'
import classNames from "classnames/bind";
import {Select,Space,Input} from "antd";
import './styleCustom.scss'
SearchSelectKey.propTypes = {
        listKeys: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired
};
const cx=classNames.bind(styles)
function SearchSelectKey({listKeys=[],onSearch}) {
    const [search, setSearch] = React.useState('')
    const [keySearch, setKeySearch] = React.useState('name')
    const { Search } = Input;
    const handleSelectKeySearch=(value)=>{
        setKeySearch(value)
        setSearch('')
    }
    const handleOnSearch=()=>{
       onSearch(  `${keySearch}=${search}`)
    }
    return (
        <Space.Compact>
            <Select defaultValue="Tên" options={listKeys}
                    onChange={handleSelectKeySearch}
                    size={"large"} className={'key-search'} />
            <Search
                placeholder="Tìm ..."
                onSearch={handleOnSearch}
                value={search}
                onChange={e=>setSearch(e.target.value)}
                className={'search-input'}
                style={{
                    width: 250,
                }}
            />

        </Space.Compact>
    );
}

export default SearchSelectKey;