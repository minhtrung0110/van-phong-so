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
import {Button, Col, Row, Tooltip} from "antd";
import SearchSelection from "~/components/commoms/SearchHideButton";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import FilterCheckbox from "~/components/commoms/FilterCheckbox";
import {setIsAdd} from "~/redux/reducer/staff/staffReducer";
import {isEmpty} from "lodash";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import PaginationUI from "~/components/commoms/Pagination";

ManageStaff.propTypes = {};

function ManageStaff(props) {
    const data_staff_table = [
        {
            id: 1,
            first_name: 'Nguyễn Đức Minh',
            last_name: 'Trung',
            phone_number: '09744148784',
            gender: 'nam',
            birth_date: '01-10-2001',
            mail: 'minhtrung@gmail.com',
            role: 'CEO',
            avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
            address: 'Tan Quy Tây, Bình Chanh,HCM',
            status: 1,
        },
        {
            id: 2,
            first_name: 'Dương Đình Khả',
            last_name: 'Ngân',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '12-06-1996',
            mail: 'nganxulaku@gmail.com',
            role: 'diễn viên',
            avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
            address: 'HCM',
            status: 1,
        },
        {
            id: 3,
            first_name: 'Đặng Mỹ',
            last_name: 'Duyên',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '13-03-2001',
            mail: 'myduyendang@gmail.com',
            role: 'marketing',
            avatar: 'https://i.ibb.co/b1NMyzK/245804844-404366584523944-4549889997937277396-n.jpg?fbclid=IwAR3ohY6mG5WqQ36DPg85eUhRqvEhPzC6s9uc9i06tceKdvE1XHYVoDsRCvU',
            address: 'HCM',
        },
        {
            id: 4,
            first_name: 'Lê Phạm',
            last_name: 'Ngân',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '01-10-2008',
            mail: 'nganxulaku@gmail.com',
            role: 'Thư Ký',
            avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
            address: 'HCM',
            status: 1,
        },
        {
            id: 5,
            first_name: 'Hà',
            last_name: 'Nhi',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '08-02-1994',
            mail: 'nhixinhdep@gmail.com',
            role: 'ca sĩ',
            avatar: 'https://images2.thanhnien.vn/Uploaded/thynhm/2022_08_08/ha-nhi-7-8636.jpg',
            address: 'HCM',
            status: 1,
        },
        {
            id: 6,
            first_name: 'Antoine',
            last_name: 'Griezmann',
            phone_number: '08844148784',
            gender: 'name',
            birth_date: '21-03-1991',
            mail: 'grizzman@gmail.com',
            role: 'cầu thủ bóng đá',
            avatar: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Ft0.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcSh_2cDcgasSuGCyjfZ5hNgoRcTTFUxS4glqH5JdfQNj2Tya51AKCzb1U0SSwdVAgxbemivrJWZ16EhfrY&psig=AOvVaw2lAsyuOqTSTHIhVRdrfPvG&ust=1677747769255000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKC3m9Cvuv0CFQAAAAAdAAAAABAE',
            address: 'HCM',
            status: 0,
        },
        {
            id: 7,
            first_name: 'Johan',
            last_name: 'Abu-lsa',
            phone_number: '07844458284',
            gender: 'Nam',
            birth_date: '28-12-1995',
            mail: 'abduio@gmail.com',
            role: 'nhân viên',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
            address: 'HCM',
            status: 0,
        },
        {
            id: 8,
            first_name: 'Christian',
            last_name: 'Buehner',
            phone_number: '07802148784',
            gender: 'nam',
            birth_date: '18-07-1984',
            mail: 'buderyu@gmail.com',
            role: 'nhân viên',
            avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            address: 'HCM',
            status: 1,
        },
        {
            id: 9,
            first_name: 'Nguyễn Văn ',
            last_name: 'Tèo',
            phone_number: '08844148784',
            gender: 'nam',
            birth_date: '08-02-1994',
            mail: 'nguyenvanteo@gmail.com',
            role: 'nhân viên',
            avatar: 'https://tadalafil20.net/Upload/images/s%E1%BB%A9c%20kh%E1%BB%8Fe%20tu%E1%BB%95i%2040.jpg',
            address: 'HCM',
            status: 0,
        },
    ]
    const data_staff_table_header = [...staff_table_header];

    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(data_staff_table);
    const isAddStaff = useSelector(isAddStaffSelector);
    const isEditStaff = useSelector(isEditStaffSelector);
    const detailStaff = useSelector(staffSelector)
    const dispatch = useDispatch();
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [page, setPage] = React.useState(1);
    console.log(data.length)
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

        console.log(isEmpty(detailStaff))
    return (
        <>
            {
                !!isAddStaff ?
                    (<AddStaff/>)
                    : (
                        !!isEditStaff ? (<EditStaff/>) : (
                            isEmpty(detailStaff) ? (
                                    <div className='container-staff'>

                                        <div className='header-staff-page'>
                                            <div className='title '>
                                                <FaUsers className='icon-staff'/>
                                                <h4> Danh Sách Nhân Viên</h4>
                                            </div>
                                            {
                                                !isAddStaff && !isEditStaff && (
                                                    <div className='filter-staff-page'>
                                                        <div className='filter-group'>
                                                            <FilterRadiobox width='15.2rem'/>
                                                            <FilterCheckbox/>

                                                        </div>
                                                        <div className='search-excel'>
                                                            <SearchHidenButton height='2.4rem' width='20rem'
                                                                               backgroundButton='#1477DAFF'/>
                                                            <Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                                                <Button className='btn'><FaFileUpload className='icon'/></Button>
                                                            </Tooltip>
                                                            <Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                                                <Button className='btn'><FaFileDownload className='icon'/></Button>
                                                            </Tooltip>
                                                            <Button className='btn-outline-primary btn-add'
                                                                    onClick={goToPageAddStaff}>Thêm </Button>


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
                                    </div>


                                )
                                : (<DetailStaff/>)
                        )
                    )


            }
        </>

    );
}

export default ManageStaff;