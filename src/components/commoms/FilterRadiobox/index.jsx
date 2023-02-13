import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterRadiobox.module.scss'
import classNames from "classnames/bind";
import {Select, Input, DatePicker} from "antd";

FilterRadiobox.propTypes = {};
const cx = classNames.bind(styles)

function FilterRadiobox(props) {
    const [selectedItem, setSelectedItem] = useState()
    const lists = [
        {
            id: 1,
            label: 'Hoạt Động',
            value: 'active',

        },
        {
            id: 2,
            label: 'Vô Hiệu',
            value: 'disabled',
        },
        {
            id: 3,
            label: 'Tất Cả',
            value: 'all',
        },

    ]
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className={cx('filter-box')}>
            <Input.Group compact >
                <Input
                    size='large'
                    className={cx('filter-title')}
                    style={{
                        width: '29%',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor:'#0d6efd',
                        cursor: 'pointer'
                    }}
                    disabled
                    defaultValue="Trạng Thái:"
                />
                <Select
                    defaultValue= 'Tất Cả'
                    allowClear
                    size={"large"}
                    border={false}
                    style={{
                        width: 135,
                        border:'none',


                    }}
                    dropdownStyle={{
                        padding:0,
                        fontSize:'0.9rem',
                    }}
                    onChange={handleChange}
                    options={lists}
                    className={cx('select')}
                >
                    {
                        !!lists && lists.map((item)=>(
                            <option key={item.id} value={item.key} className={cx('select-item')}>{item.label}</option>
                        ))
                    }
                </Select>
            </Input.Group>
        </div>
    );
}

export default FilterRadiobox;
//
// const lists = [
//     {
//         id: 1,
//         label: 'Quản Lý',
//         key: 'manager',
//     },
//     {
//         id: 2,
//         label: 'Trưởng Phòng',
//         key: 'leader',
//     },
//     {
//         id: 3,
//         label: 'Kế Toán',
//         key: 'Accountant',
//     },
//     {
//         id: 4,'Nhân Viên',
//         key: 'staff',
//     },
// ]