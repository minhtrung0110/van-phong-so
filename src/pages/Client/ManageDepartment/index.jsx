import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import StaffTable from "~/components/Client/Staff";
import NotFoundData from "~/components/commoms/NotFoundData";
import DepartmentTable from "~/components/Client/Department";
import {department_table_header} from "~/asset/data/department-table-header";
import PaginationUI from "~/components/commoms/Pagination";
import {FaFileDownload, FaFileUpload, FaRegBuilding, FaUsers} from "react-icons/fa";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import FilterCheckbox from "~/components/commoms/FilterCheckbox";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {Button, Modal, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {isAddDepartmentSelector, isEditDepartmentSelector} from "~/redux/selectors/department/departmenrSelector";
import EditDepartment from "~/components/Client/Department/Edit";
import AddDepartment from "~/components/Client/Department/Add";
import {setIsAdd} from "~/redux/reducer/department/departmentReducer";

ManageDepartment.propTypes = {};

function ManageDepartment(props) {
    const listDepartments = [
        {
            id: 1,
            name: 'Phòng Kinh Doanh',
            status: 1,

        },
        {
            id: 2,
            name: 'Phòng Kỹ Thuật',
            status: 0,
        },
        {
            id: 3,
            name: 'Phòng Kinh Doanh',
            status: 1,

        },
        {
            id: 4,
            name: 'Phòng Kỹ Thuật',
            status: 0,
        },
        {
            id: 5,
            name: 'Phòng Kinh Doanh',
            status: 1,

        },
        {
            id: 6,
            name: 'Phòng Kỹ Thuật',
            status: 0,
        }
    ]
    const [data, setData] = useState(listDepartments)
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch()
    const isAdd = useSelector(isAddDepartmentSelector)
    const isEdit = useSelector(isEditDepartmentSelector)
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleOpenAddDepartment = () => {
        setIsModalOpen(true);
    }
    const handleAddDepartment=()=>{
        setIsModalOpen(false);
        //call api
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {
                !!isEdit ? (<EditDepartment/>) : (
                    <div className='container-department'>
                        <div className='header-department-page'>
                            <div className='title '>
                                <FaRegBuilding className='icon'/>
                                <h4> Danh Sách Phòng Ban</h4>
                            </div>
                            <div className='filter-department-page'>
                                <div className='filter-group'>
                                    <FilterRadiobox width='15.2rem'/>

                                </div>
                                <div className='search-excel'>
                                    <SearchHidenButton height='2.4rem' width='18rem'
                                                       backgroundButton='#1477DAFF'/>
                                    <Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                        <Button className='btn'><FaFileUpload className='icon'/></Button>
                                    </Tooltip>
                                    <Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'#2F8D45FF'}>
                                        <Button className='btn'><FaFileDownload className='icon'/></Button>
                                    </Tooltip>
                                    <Button className='btn-add'
                                            onClick={handleOpenAddDepartment}>Tạo Mới </Button>


                                </div>
                            </div>

                        </div>
                        <div className='content-department-page'>
                            {
                                data.length > 0 ? (
                                    <DepartmentTable tableHeader={department_table_header} tableBody={data}/>
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

            }\
            <Modal title="Tạo Mới Phòng Ban" open={isModalOpen}

                   maskClosable={true}
                   onCancel={handleCancel}
                   footer={null}
                   width={700}
                   style={{top: 150}}
            >
              <AddDepartment onCancel={handleCancel} onSubmit={handleAddDepartment} />
            </Modal>
        </>
    )
        ;
}

export default ManageDepartment;