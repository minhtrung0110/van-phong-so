import React, {useEffect} from 'react';
import StaffTable from "~/components/Client/Staff";
import {staff_table_header} from "~/asset/data/staff-table-header";
import NotFoundData from "~/components/commoms/NotFoundData";
import './style.scss'
import {FaFileDownload,  FaFileUpload,  FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {
    isAddStaffSelector,
    isEditStaffSelector,
    isResetStaffSelector,
    staffSelector
} from "~/redux/selectors/staff/staffSelector";
import AddStaff from "~/components/Client/Staff/Add";
import EditStaff from "~/components/Client/Staff/Edit";
import {Button,Space, Select, Tooltip} from "antd";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {setIsAdd} from "~/redux/reducer/staff/staffReducer";
import {isEmpty} from "lodash";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import PaginationUI from "~/components/commoms/Pagination";
import ListTableSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import FilterSelect from "~/components/commoms/FilterSelect";
import SearchSelectKey from "~/components/commoms/SearchSelectKey";

ManageStaff.propTypes = {};
const listStatus = [
    {
        id: '1x',
        label: 'Hoạt Động',
        value: 1,

    },
    {
        id: '2x',
        label: 'Thôi Việc',
        value: 0,
    },
    {
        id: '3x',
        label: 'Tất Cả',
        value: 'all',
    },

]
const listRole = [
    {
        id: 1,
        label: 'Quản Lý',
        value: '1',
    },
    {
        id: 2,
        label: 'Trưởng Phòng',
        value: '2',
    },
    {
        id: 3,
        label: 'Kế Toán',
        value: '3',
    },
    {
        id: 4,
        label:'Tất Cả',
        value: 'all',
    },
]
const listKeySearch = [
    {
        label: 'Tên',
        value: 'name',
    },
    {
        label: 'Email',
        value: 'email',
    },
    {
        label: 'Mã',
        value: 'id',
    },
]
function ManageStaff(props) {
    const data_staff_table_header = [...staff_table_header];
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState({role:'all',status:'all'})
    const isAddStaff = useSelector(isAddStaffSelector);
    const isEditStaff = useSelector(isEditStaffSelector);
    const detailStaff = useSelector(staffSelector)
    const dispatch = useDispatch();
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [page, setPage] = React.useState(1);
    const isReset = useSelector(isResetStaffSelector);
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        const result = await getListStaffs({
            page,
        });
        if (result === 401) {
        } else if (result === 500) {
            return false;

        } else {
            setStaff(result, 'page');
        }
        setLoading(false);
    };
    const goToPageAddStaff = () => {
        // BlockUI('#root', 'fixed');
        // setTimeout(function () {
        dispatch(setIsAdd(true));
        //     // Notiflix.Block.remove('#root');
        // }, 300);
    };


    useEffect(() => {
        async function fetchData() {
          //  setLoading(true)
            console.log('Search:', search, ' - Filter:', filter)
            let params = {};
            if (filter.status !== 'all' || filter.role!=='all') params = { ...params, filter };
            if (search !== '') params = { ...params, filter, search };
            console.log('Params:', params)
            const respond = await getListStaffs(params);
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setData([])
                return false;
            } else {
                setStaff(respond, 'reset-page');
            }
            setLoading(false);
        }
        fetchData();
    }, [search, filter,isReset]);

    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const backToStaffList = async (value, action) => {
        setLoading(true);
        if (action === 'edit') {
        }
        const result = await getListStaffs({
            sort: value,
        });
        setStaff(result, 'page');
        setLoading(false);
    };
    const setStaff = (respond, value) => {
        setData(respond.results);
        if (value !== 'page') {
            setPage(1);
        }
        setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
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
                    (<AddStaff backToStaffList={backToStaffList} />)
                    : (
                        !!isEditStaff ? (<EditStaff backToStaffList={backToStaffList} />) :
                          (

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
                                                                    <FilterSelect listOptions={listStatus} width='15.2rem'
                                                                                  title={'Trạng thái'}
                                                                                  background={'#de935e'}
                                                                                  onFilter={handleFilterStatus}/>
                                                                    <FilterSelect listOptions={listRole} width='15rem'
                                                                                  title={'Chức vụ'}  background={'#5fc5b2'}
                                                                                   onFilter={handleFilterRole} />

                                                                </div>
                                                                <div className='search-excel'>
                                                                    <SearchSelectKey listKeys={listKeySearch}
                                                                        onSearch={setSearch}
                                                                    />
                                                                    {/*<Space.Compact>*/}
                                                                    {/*    <Select defaultValue="Tên" options={listKeySearch}*/}
                                                                    {/*            onChange={handleSelectKeySearch}*/}
                                                                    {/*            size={"large"} className={'key-search'} />*/}
                                                                    {/*    <SearchHidenButton height='2.4rem' width='20rem'*/}
                                                                    {/*             value={search}          onSearch={setSearch}    backgroundButton='#1477DA'/>*/}

                                                                    {/*</Space.Compact>*/}
                                                                    {/*<Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'import'}>*/}
                                                                    {/*    <Button className='btn'><FaFileUpload className='icon'/></Button>*/}
                                                                    {/*</Tooltip>*/}
                                                                    {/*<Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'export'}>*/}
                                                                    {/*    <Button className='btn'><FaFileDownload className='icon'/></Button>*/}
                                                                    {/*</Tooltip>*/}
                                                                    <button className='btn-add'
                                                                            onClick={goToPageAddStaff}>Tạo Mới</button>


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
                                                    {totalRecord >= 1 && (
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


                    )


            }
        </>

    );
}

export default ManageStaff;