import React from 'react';
import PropTypes from 'prop-types';
import StaffTable from "~/components/Client/Staff";
import {staff_table_header} from "~/asset/data/staff-table-header";
import NotFoundData from "~/components/commoms/NotFoundData";
import './style.scss'
import {FaFileDownload, FaFileExcel, FaFileUpload, FaUser, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {isAddStaffSelector, isEditStaffSelector} from "~/redux/selectors/staff/staffSelector";
import AddStaff from "~/components/Client/Staff/Add";
import EditStaff from "~/components/Client/Staff/Edit";
import {Button, Col, Row, Tooltip} from "antd";
import SearchSelection from "~/components/commoms/SearchHideButton";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import FilterCheckbox from "~/components/commoms/FilterCheckbox";
import {setIsAdd} from "~/redux/reducer/staff/staffReducer";

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
            id: 2,
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
            id: 2,
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
        }
    ]
    const data_staff_table_header = [...staff_table_header];
    const [data, setData] = React.useState(data_staff_table);
    const isAddStaff = useSelector(isAddStaffSelector);
    const isEditStaff = useSelector(isEditStaffSelector);
    const dispatch=useDispatch();
    const goToPageAddStaff = () => {
        // BlockUI('#root', 'fixed');
        // setTimeout(function () {
            dispatch(setIsAdd(true));
        //     // Notiflix.Block.remove('#root');
        // }, 300);
    };
    return (
        <div className='container-staff'>

            <div className='header-staff-page'>
                <div className={` title ${isAddStaff || isEditStaff ?'ml-5':''}`}>
                    <FaUsers className='icon-staff'/>
                    <h4 >{isAddStaff ? 'Thêm Nhân Viên' : (isEditStaff ? 'Cập Nhật Thông Tin Nhân Viên' : 'Danh Sách Nhân Viên')}</h4>
                </div>
                {
                    !isAddStaff && !isEditStaff && (
                        <div className='filter-staff-page'>
                            <div  className='filter-group' >
                                <FilterRadiobox   width='15.2rem'/>
                                <FilterCheckbox />

                            </div>
                            <div className='search-excel' >
                                <SearchHidenButton  height='2.4rem' width='20rem' backgroundButton='#1477DAFF'/>
                                <Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                    <Button className='btn'><FaFileUpload className='icon'/></Button>
                                </Tooltip>
                                <Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                    <Button className='btn' ><FaFileDownload className='icon' /></Button>
                                </Tooltip>
                                <Button className='btn-outline-primary btn-add' onClick={goToPageAddStaff}>Thêm </Button>


                            </div>
                        </div>
                    )
                }
            </div>
            <div className='content-staff-page'>
                {
                    !!isAddStaff ?
                        (<AddStaff/>)
                        : (
                            !!isEditStaff ? (<EditStaff/>) : data.length > 0 ? (
                                <StaffTable tableHeader={data_staff_table_header} tableBody={data}/>
                            ) : (
                                <NotFoundData/>
                            )

                        )


                }
            </div>
        </div>
    );
}

export default ManageStaff;