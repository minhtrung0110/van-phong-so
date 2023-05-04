import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterCheckbox.module.scss'
import classNames from "classnames/bind";
import {Select, Input, DatePicker, Checkbox} from "antd";

FilterCheckbox.propTypes = {};
const cx = classNames.bind(styles)

function FilterCheckbox({onFilter}) {
    const lists = [
        {
            label: 'Quản Lý',
            value: '1',
        },
        {
            label: 'Trưởng Phòng',
            value: '2',
        },
        {
            label: 'Kế Toán',
            value: '3',
        },
        {
            label:'Tất Cả',
            value: 'all',
        },
    ]
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        onFilter(value)
    };
    return (
        <div className={cx('filter-box')}>
            <Input.Group compact >
                <Input
                    size='large'
                    className={cx('filter-title')}
                    style={{
                        width: '26%',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor:'#e1156a',
                        cursor: 'pointer'
                    }}
                    disabled
                    defaultValue="Chức Vụ:"
                />
                <Select
                    showSearch
                    defaultValue= 'Tất Cả'
                    allowClear
                    size={"large"}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{
                        width: 135,
                        border:'none',


                    }}
                    className={cx('select')}
                    dropdownStyle={{
                        padding:0,
                        fontSize:'0.9rem',
                    }}
                    onChange={handleChange}
                    options={lists}
                />
            </Input.Group>

        </div>
    );
}

export default FilterCheckbox;

