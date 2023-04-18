import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterRadiobox.module.scss'
import classNames from "classnames/bind";
import {Select, Input, DatePicker} from "antd";

FilterRadiobox.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};
const cx = classNames.bind(styles)

function FilterRadiobox({width, height,backGround='#0d6efd',onFilter}) {
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
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor:backGround,
                        cursor: 'pointer'
                    }}
                    disabled
                    defaultValue="Trạng Thái:"
                />
                <Select
                    defaultValue= 'Tất Cả'
                    allowClear
                    size={"large"}
                    style={{
                        width: 135,
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
                            <Select.Option key={item.id} value={item.key} className={cx('select-item')}>{item.label}</Select.Option>
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