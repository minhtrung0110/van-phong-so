import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterProject.module.scss'
import classNames from "classnames/bind";
import {Dropdown, Checkbox, Select} from "antd";
import {FaFilter, FaPager, FaRegFlag, FaSignOutAlt, FaUser} from "react-icons/fa";
import GroupMember from "~/components/Client/Task/GroupMember";
import {config} from "~/config";
import Menu from "~/components/commoms/Popper/Menu";

FilterProject.propTypes = {};
const cx = classNames.bind(styles)

function FilterProject({listMember = [], onFilter}) {
    const [filters, setFilters] = useState([])
    const [checkedListMember, setCheckedListMember] = useState([]);
    const [checkedListDuration, setCheckedListDuration] = useState([]);
    const [checkedListPriority, setCheckedListPriority] = useState([]);
    const [value, setValue] = useState([]);
    const filterOption = (input, option) => {
        //validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input))
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        else return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    const optionsSelectMember = listMember.map((d) => ({
        value: d.id,
        label: `${d.first_name} ${d.last_name}`,
    }))
    console.log(optionsSelectMember)
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value,
        options:optionsSelectMember,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'Chọn thành viên...',
        maxTagCount: 'responsive',
    };
    const optionsMember = [
        {value: 'none-member', label: 'Không được giao'},
        {value: 'myself', label: 'Giao cho tôi'},

    ];
    const optionsDueDay = [
        {value: 'none-duration', label: 'Không có'},
        {value: 'out-of-date', label: 'Quá hạn'},
        {value: 'near-3', label: 'Gần đến hạn (3 ngày) '},
        {value: 'near-7', label: 'Gần đến hạn (7 ngày) '},
        {value: 'near-10', label: 'Gần đến hạn (10 ngày) '},
    ];
    const optionsPriority = [
        {value: 'none-priority', label: 'Không ưu tiên'},
        {value: 'highly', label: 'Ưu tiên cao'},
        {value: 'middle', label: 'Ưu tiên trung bình '},
        {value: 'low', label: 'Ưu tiên thấp '},
    ];
    const onChangeDuration = (list) => {
        setCheckedListDuration(list)
        const newlistFilter = (filters, newOptions) => {
            return filters.filter((item) => item !== newOptions)
        }

        // console.log(filters)
    };
    const onChangePriority = (list) => {
        setCheckedListPriority(list)

        // console.log(filters)
    };
    const onChangeMember = (list) => {
        setCheckedListMember(list)

        // console.log(filters)
    };
    useEffect(() => {
        onFilter({
            member: checkedListMember,
            duration: checkedListDuration,
            priority: checkedListPriority
        })
    }, [checkedListMember, checkedListDuration, checkedListPriority])
    const itemsFilter = [
        {
            id: '1',
            label: 'Thành Viên',
            content: (
                <div className={cx('list-sub-item')}>
                    <Checkbox.Group className={cx('list-sub-item')}
                                    options={optionsMember}
                                    value={checkedListMember}
                                    onChange={onChangeMember}/>

                    <Select showSearch
                            className={cx('filter-select')} {...selectProps} size='middle'/>
                </div>
            )
        },
        {
            id: '2',
            label: 'Thời gian hoàn thành',
            content: (
                <Checkbox.Group className={cx('list-sub-item')}
                                options={optionsDueDay}
                                value={checkedListDuration}
                                name='duration'
                                onChange={onChangeDuration}/>

            )
        },
        {
            id: '3',
            label: 'Độ ưu tiên',
            content: (
                <Checkbox.Group className={cx('list-sub-item')}
                                options={optionsPriority}
                                name='priority'
                                value={checkedListPriority}
                                onChange={onChangePriority}/>
            )
        }
    ]
    return (
        <div>
            <Menu items={itemsFilter} hideOnClick={false}>
                <a onClick={(e) => e.preventDefault()}>
                    <div className='filter-task'>
                        <FaFilter className='icon'/>
                        Bộ lọc
                    </div>
                </a>
            </Menu>
        </div>
    );
}

export default FilterProject;