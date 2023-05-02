import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import StaffTable from "~/components/Client/Staff";
import {staff_table_header} from "~/asset/data/staff-table-header";
import NotFoundData from "~/components/commoms/NotFoundData";
import './style.scss'
import {FaFileDownload, FaFileExcel, FaFileUpload, FaUser, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {isAddStaffSelector, isEditStaffSelector, staffSelector} from "~/redux/selectors/staff/staffSelector";
import AddStaff from "~/components/Client/Staff/Add";
import EditStaff from "~/components/Client/Staff/Edit";
import {Button, Col, Row, Skeleton, Tooltip} from "antd";
import SearchSelection from "~/components/commoms/SearchHideButton";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import FilterCheckbox from "~/components/commoms/FilterCheckbox";
import {setIsAdd} from "~/redux/reducer/staff/staffReducer";
import {isEmpty} from "lodash";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import PaginationUI from "~/components/commoms/Pagination";
import ListStaffSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import ListTableSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {listStaffs} from "~/asset/data/initDataGlobal";

ManageStaff.propTypes = {};

function ManageStaff(props) {
    const data_staff_table_header = [...staff_table_header];
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(listStaffs);
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState()
    const isAddStaff = useSelector(isAddStaffSelector);
    const isEditStaff = useSelector(isEditStaffSelector);
    const detailStaff = useSelector(staffSelector)
    const dispatch = useDispatch();
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [page, setPage] = React.useState(1);

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
    const goToPageAddStaff = () => {
        // BlockUI('#root', 'fixed');
        // setTimeout(function () {
        dispatch(setIsAdd(true));
        //     // Notiflix.Block.remove('#root');
        // }, 300);
    };
    const handleEditStaff=(data) => {
        console.log('EditStaff', data);
    }

    useEffect(()=>{
        console.log('Search:',search,' - Filter:',filter)
    },[data,search,filter])
    const handleFilterStatus=(value) => {
        const stt={status:value}
        setFilter(prev=>({...prev,...stt}))
    }
    const handleFilterRole=(value) => {
        const role={role:value}
        setFilter(prev=>({...prev,...role}))
    }
    return (
        <>
            {
                !!isAddStaff ?
                    (<AddStaff/>)
                    : (
                        !!isEditStaff ? (<EditStaff onSave={handleEditStaff}/>) : (
                            isEmpty(detailStaff) ? (

                                        !!loading ?(<ListTableSkeleton column={6} lengthItem={5}/>):
                                            (    <div className='container-staff'>

                                                <div className='header-staff-page'>
                                                    <div className='title '>
                                                        <FaUsers className='icon-staff'/>
                                                        <h4> Danh Sách Nhân Viên</h4>
                                                    </div>
                                                    {
                                                        !isAddStaff && !isEditStaff && (
                                                            <div className='filter-staff-page'>
                                                                <div className='filter-group'>
                                                                    <FilterRadiobox width='15.2rem' onFilter={handleFilterStatus}/>
                                                                    <FilterCheckbox onFilter={handleFilterRole} />

                                                                </div>
                                                                <div className='search-excel'>
                                                                    <SearchHidenButton height='2.4rem' width='20rem'
                                                                      onSearch={setSearch}                 backgroundButton='#1477DA'/>

                                                                    <Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'import'}>
                                                                        <Button className='btn'><FaFileUpload className='icon'/></Button>
                                                                    </Tooltip>
                                                                    <Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'export'}>
                                                                        <Button className='btn'><FaFileDownload className='icon'/></Button>
                                                                    </Tooltip>
                                                                    <Button className='btn-add'
                                                                            onClick={goToPageAddStaff}>Tạo Mới</Button>


                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className='content-staff-page'>
                                                    {
                                                        data.length > 0 ? (
                                                            <StaffTable tableHeader={data_staff_table_header} tableBody={data}/>
                                                        ) : (
                                                            <NotFoundData/>
                                                        )

                                                    }
                                                    {totalRecord >= 8 && (
                                                        <PaginationUI
                                                            handlePageChange={handlePageChange}
                                                            perPage={8}
                                                            totalRecord={totalRecord}
                                                            currentPage={page}
                                                        />
                                                    )}
                                                </div>
                                            </div>)



                                )
                                : (<DetailStaff/>)
                        )
                    )


            }
        </>

    );
}

export default ManageStaff;