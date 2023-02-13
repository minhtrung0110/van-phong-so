import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterCheckbox.module.scss'
import classNames from "classnames/bind";
import {Select, Input, DatePicker, Checkbox} from "antd";

FilterCheckbox.propTypes = {};
const cx = classNames.bind(styles)

function FilterCheckbox(props) {
    const [selectedItem, setSelectedItem] = useState()
    const lists = [
        {
            label: 'Quản Lý',
            value: 'manager',
        },
        {
            label: 'Trưởng Phòng',
            value: 'leader',
        },
        {
            label: 'Kế Toán',
            value: 'Accountant',
        },
        {
            label:'Nhân Viên',
            value: 'staff',
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
                    <Checkbox.Group options={lists} defaultValue={['Pear']} onChange={handleChange} />
                </Select>
            </Input.Group>
        </div>
    );
}

export default FilterCheckbox;

