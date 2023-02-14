import React from 'react';
import PropTypes from 'prop-types';
import StaffTable from "~/components/Client/Staff";
import {staff_table_header} from "~/asset/data/staff-table-header";
import NotFoundData from "~/components/commoms/NotFoundData";
import './style.scss'
import {FaFileDownload, FaFileExcel, FaFileUpload, FaUser, FaUsers} from "react-icons/fa";
import {useSelector} from "react-redux";
import {isAddStaffSelector, isEditStaffSelector} from "~/redux/selectors/staff/staffSelector";
import AddStaff from "~/components/Client/Staff/Add";
import EditStaff from "~/components/Client/Staff/Edit";
import {Button, Col, Row, Tooltip} from "antd";
import SearchSelection from "~/components/commoms/SearchHideButton";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import FilterCheckbox from "~/components/commoms/FilterCheckbox";

ManageStaff.propTypes = {};

function ManageStaff(props) {
    const data_staff_table = [
        {
            id: 1,
            first_name: 'Dương Hoài Bảo',
            last_name: 'Trung',
            phone_number: '08844148784',
            gender: 'nam',
            birth_date: '01-10-2008',
            mail: 'teoalu@gmail.com',
            role: 'staff',
            avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
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
            role: 'staff',
            avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
            address: 'HCM',
            status: 1,
        }
    ]
    const data_staff_table_header = [...staff_table_header];
    const [data, setData] = React.useState(data_staff_table);
    const isAddStaff = useSelector(isAddStaffSelector);
    const isEditStaff = useSelector(isEditStaffSelector);

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