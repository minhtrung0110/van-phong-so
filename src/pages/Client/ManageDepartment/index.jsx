import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import StaffTable from "~/components/Client/Staff";
import NotFoundData from "~/components/commoms/NotFoundData";
import DepartmentTable from "~/components/Client/Department";
import {department_table_header} from "~/asset/data/department-table-header";
import PaginationUI from "~/components/commoms/Pagination";
ManageDepartment.propTypes = {

};

function ManageDepartment(props) {
    const listDepartments = [
        {id:1,
            name:'Phòng Kinh Doanh',
            status:1,

        },
        {id:2,
            name:'Phòng Kỹ Thuật',
            status:0,
        }
    ]
    const [data,setData]=useState(listDepartments)
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(true);
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
    return (
        <div className='container-department'>
            <div className='header-department-page'>


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
    );
}

export default ManageDepartment;