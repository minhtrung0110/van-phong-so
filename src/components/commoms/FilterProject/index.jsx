import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterProject.module.scss'
import classNames from "classnames/bind";
import {Dropdown, Checkbox, Select} from "antd";
import {FaFilter, FaPager, FaRegFlag, FaSearch, FaSignOutAlt, FaUser} from "react-icons/fa";
import GroupMember from "~/components/Client/Task/GroupMember";
import {config} from "~/config";
import Menu from "~/components/commoms/Popper/Menu";
import SearchHidenButton from "~/components/commoms/SearchHideButton";

FilterProject.propTypes = {};
const cx = classNames.bind(styles)

function FilterProject({listmember = [], onFilter, className}) {
    const [checkedListMember, setCheckedListMember] = useState([]);
    const [checkedListDuration, setCheckedListDuration] = useState([]);
    const [checkedListPriority, setCheckedListPriority] = useState([]);
    const [listMemberMore, setListMemberMore] = useState([]);
    const [amountFilter, setAmountFilter] = useState(0);
    const [searchValue, setSearchValue] = useState('')
    const optionsSelectMember = listmember.map((d) => ({
        value: d.id,
        label: `${d.first_name} ${d.last_name}`,
    }))
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
    };
    const onChangePriority = (list) => {
        setCheckedListPriority(list)
    };
    const onChangeMember = (list) => {
        setCheckedListMember(list)
    };
    const onSearch = (value) => {
        setSearchValue(value)
    };
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        listmember,
        options: optionsSelectMember,
        onChange: (newValue) => {
            setListMemberMore(newValue);
        },
        placeholder: 'Chọn thành viên...',
        maxTagCount: 'responsive',
    };
    const handleClearFilter=()=>{
        if(searchValue!=='' || checkedListPriority.length>0 || checkedListMember.length>0 || checkedListDuration.length>0){
            setSearchValue('')
            setCheckedListDuration([])
            setCheckedListMember([])
            setCheckedListPriority([])
        }
    }
    const itemsFilter = [
        {
            id: '1',
            label: 'Tìm kiếm',
            content: (
                <div className={cx('list-sub-item-search')}>
                    <SearchHidenButton className='search' width='20rem' height='2rem' searchButtonText={<FaSearch/>}
                                       onSearch={onSearch}
                    />
                </div>
            )
        },
        {
            id: '2',
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
            id: '3',
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
            id: '4',
            label: 'Độ ưu tiên',
            content: (
                <Checkbox.Group className={cx('list-sub-item')}
                                options={optionsPriority}
                                name='priority'
                                value={checkedListPriority}
                                onChange={onChangePriority}/>
            )
        },
        {
            id: '5',
            label: null,
            content: (
              <button className={cx('btn-clear-filter')} onClick={handleClearFilter}>Dọn dẹp bộ lọc</button>
            )
        }
    ]
    useEffect(() => {
        const filter = {
            search: searchValue,
            member: checkedListMember.concat(listMemberMore),
            duration: checkedListDuration,
            priority: checkedListPriority
        }
        setAmountFilter(Object.values(filter).reduce((acc, item) => {
            if (item.length > 0) return acc + 1
            else return acc
        }, 0))
        onFilter(filter)

    }, [searchValue, checkedListMember, listMemberMore, checkedListDuration, checkedListPriority])
    return (
        <div className={cx('filter-btn')}>
            <Menu items={itemsFilter} hideOnClick={false} delay={400}>
                <div className={cx('filter-project')}>
                    <FaFilter className={cx('icon')}/>
                    <span className={cx('title')}>  Bộ lọc</span>
                    <span className={cx('amount')}>{amountFilter}</span>
                </div>
            </Menu>
        </div>
    );
}

export default FilterProject;