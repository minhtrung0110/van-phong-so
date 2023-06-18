import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterSelect.module.scss'
import classNames from "classnames/bind";
import {Select, Input} from "antd";

FilterSelect.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    listOptions: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onFilter:PropTypes.func.isRequired,
    background: PropTypes.string,
};
const cx = classNames.bind(styles)
function FilterSelect({listOptions=[],width, height,title,background='#0d6efd',onFilter}) {

    const handleChange = (value) => {
      //  console.log(`selected ${value}`);
        onFilter(value)
    };
    return (
        <div className={cx('filter-box')}>
            <Input.Group compact className={cx('input-group')}
            style={{width:width, height:height}}
            >
                <Input
                    size='large'
                    className={cx('filter-title')}
                    style={{
                        width: '44%',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor:background,
                        cursor: 'pointer',
                    }}
                    disabled
                    defaultValue={title}
                />
                <Select
                    defaultValue= 'Tất Cả'
                    allowClear
                    size={"large"}
                    style={{
                        width: 130,
                        fontSize:'0.8rem',
                    }}
                    dropdownStyle={{
                        padding:0,
                        fontSize:'0.8rem',
                    }}
                    onChange={handleChange}
                    options={listOptions}
                    className={cx('select')}
                >
                    {
                        !!listOptions && listOptions.map((item)=>(
                            <Select.Option key={item.id} value={item.key} className={cx('select-item')}>{item.label}</Select.Option>
                        ))
                    }
                </Select>
            </Input.Group>
        </div>
    );
}

export default FilterSelect;