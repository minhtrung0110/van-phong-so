import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { FaSearch, FaUserCog} from "react-icons/fa";
import FilterRadiobox from "~/components/commoms/FilterSelect";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import { message } from 'antd';
import NotFoundData from "~/components/commoms/NotFoundData";
import PaginationUI from "~/components/commoms/Pagination";
import DecentralizeTable from "~/components/Client/Decentralize";
import {listDecentralize} from "~/asset/data/initDataGlobal";
import {decentralize_table_header} from "~/asset/data/decentralize-table-header";
import {useDispatch, useSelector} from "react-redux";
import {
    isAddDecentralizeSelector,
    isEditDecentralizeSelector, isResetDecentralizeSelector
} from "~/redux/selectors/decentralize/decentralizeSelector";
import AddRole from "~/components/Client/Decentralize/Add";
import {setIsAdd, setIsEdit,setIsReset} from "~/redux/reducer/decentralize/decentralizeReducer";
import EditRole from "~/components/Client/Decentralize/Edit";
import ListTableSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {getListDepartments} from "~/api/Client/Department/departmentAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {deleteRole, getListRoles} from "~/api/Client/Role/roleAPI";
import FilterSelect from "~/components/commoms/FilterSelect";

Decentralize.propTypes = {};
const listStatus=[
    {label: "Tât Cả", value: "all"},
    {label: "Hoạt Động",value:'active'},
    {label: "Vô Hiệu", value:'disabled'},
]
function Decentralize(props) {
    const [data, setData] = useState([])
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState({role:'all',status:'all'})
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const handleAddNewRole = () => {
        dispatch(setIsAdd(true))
    }
    const handleCancelAddRole = () => {
        dispatch(setIsAdd(false))
    }
    const handleCancelUpdateRole = () => {
        dispatch(setIsEdit(false))
    }
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        // const result = await getAllStaffs({
        //     page,
        // });
        // if (result === 401) {
        // } else if (result === 500) {
        //     return false;
        // } else {
        //     setStaff(result, 'page');
        // }
        setLoading(false);
    };
    const handleRemoveDecentralize = async (id) => {
        console.log('Delete Decentralize: ', id)
        const result = await deleteRole(id);
        if(result.status===1){
            dispatch(setIsReset(Math.random()));
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.5,
            });
        }
        else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.5,
            });
        }


    };
    const isAdd = useSelector(isAddDecentralizeSelector)
    const isEdit = useSelector(isEditDecentralizeSelector);
    const isReset = useSelector(isResetDecentralizeSelector);
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    useEffect(() => {
        async function fetchDataRole() {
            let params = {};
            if (filter.status !== 'all') params = { ...params, filter };
            if (search !== '') params = { ...params, filter, search };
            const respond = await getListRoles(params);
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setData([])
                return false;
            } else {
                setRole(respond, 'reset-page');
            }
            setLoading(false);
        }
        fetchDataRole();

    }, [filter, search,isReset])
    const setRole = (respond, value) => {
        setData(respond.results);
        if (value !== 'page') {
            setPage(1);
        }
        setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
    return (
        <>
            {contextHolder}
            {
                !!isAdd ? (<AddRole  onBack={handleCancelAddRole}/>)
                    : (
                        !!isEdit ? (<EditRole onBack={handleCancelUpdateRole}/>) : (
                            !!loading ? (<ListTableSkeleton column={4}/>) : (
                                <div className='container-decentralize'>
                                    <div className='header-decentralize'>
                                        <div className='title'>
                                            <FaUserCog className={'icon'}/>
                                            <b>Phân Quyền</b>
                                        </div>
                                        <div className='filter-decentralize-page'>
                                            <div className='filter-group'>
                                                <FilterSelect width={'15.2rem'} backGround={'#479f87'}
                                                                onFilter={setFilter} listOptions={listStatus} title={'Trạng Thái'}/>
                                            </div>
                                            <div className='search-create'>
                                                <SearchHidenButton height='2.4rem' width='20rem'
                                                                   searchButtonText={<FaSearch/>}
                                                                   backgroundButton='#479f87' onSearch={setSearch}/>
                                                <button className='btn-add' onClick={handleAddNewRole}>Tạo Mới</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='content-decentralize'>
                                        {
                                            data.length > 0 ? (
                                                <DecentralizeTable tableHeader={decentralize_table_header} tableBody={data}
                                                                   onDelete={handleRemoveDecentralize}
                                                />
                                            ) : (
                                                <NotFoundData/>
                                            )

                                        }
                                        {totalRecord >= 5 && (
                                            <PaginationUI
                                                handlePageChange={handlePageChange}
                                                perPage={5}
                                                totalRecord={totalRecord}
                                                currentPage={page}
                                            />
                                        )}
                                    </div>
                                </div>
                            )
                        )
                    )
            }
        </>
    );
}

export default Decentralize;