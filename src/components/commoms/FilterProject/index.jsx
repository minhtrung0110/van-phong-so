import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterProject.module.scss'
import classNames from "classnames/bind";
import {Dropdown, Checkbox, Select, Radio} from "antd";
import {FaFilter, FaPager, FaRegFlag, FaSearch, FaSignOutAlt, FaUser} from "react-icons/fa";
import GroupMember from "~/components/Client/Task/GroupMember";
import {config} from "~/config";
import Menu from "~/components/commoms/Popper/Menu";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {isEmpty} from "lodash";

FilterProject.propTypes = {};
const cx = classNames.bind(styles)

function FilterProject({listmember = [], onFilter, className}) {
    const [checkedListMember, setCheckedListMember] = useState([]);
    const [checkedListDuration, setCheckedListDuration] = useState([]);
    const [checkedListPriority, setCheckedListPriority] = useState([]);
    const [listMemberMore, setListMemberMore] = useState([]);
    const [amountFilter, setAmountFilter] = useState(0);
    const [searchValue, setSearchValue] = useState('')
    const userLogin=useSelector(getUserSelector)
    const optionsSelectMember = listmember.map((d) => ({
        value: d.id,
        label: `${d.first_name} ${d.last_name}`,
    }))
    const optionsMember = [
        {value: 'no_assign', label: 'Không được giao'},
        {value: !isEmpty(userLogin)?userLogin.id:'myself', label: 'Giao cho tôi'},

    ];
    const optionsDueDay = [
        {value: 'none_duration_complete', label: 'Không có'},
        {value: 'is_duration_complete', label: 'Quá hạn'},
        {value: 3, label: 'Gần đến hạn (3 ngày) '},
        {value: 7, label: 'Gần đến hạn (7 ngày) '},
        {value: 10, label: 'Gần đến hạn (10 ngày) '},
    ];
    const optionsPriority = [
        {value: 4, label: 'Không ưu tiên'},
        {value: 1, label: 'Ưu tiên cao'},
        {value: 2, label: 'Ưu tiên trung bình '},
        {value: 3, label: 'Ưu tiên thấp '},
    ];
    const onChangeDuration = ({ target: { value }}) => {
        setCheckedListDuration(value)
    };
    const onChangePriority = (list) => {
        setCheckedListPriority(list)
    };
    const onChangeMember = ({ target: { value }}) => {
        setCheckedListMember(value)
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
        if(searchValue!=='' || checkedListPriority.length>0 || checkedListMember.length>0 || !!checkedListDuration){
            setSearchValue('')
            setCheckedListDuration([])
            setCheckedListMember([])
            setCheckedListPriority([])
            setListMemberMore([])
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
                    <Radio.Group className={cx('list-sub-item')}
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
                <Radio.Group className={cx('list-sub-item')}
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
    console.log('Kiểm tra isEmpty',isEmpty(checkedListDuration),checkedListDuration)
    useEffect(() => {
        const filter = {
            search: searchValue,
            member: Array.isArray(checkedListMember)?checkedListMember.concat(listMemberMore):checkedListMember,
            duration: checkedListDuration,
            priority: checkedListPriority
        }
        setAmountFilter(Object.values(filter).reduce((acc, item) => {
            if (item.length===0) return acc
            else return acc+1
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