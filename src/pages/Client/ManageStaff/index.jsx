import React from 'react';
import PropTypes from 'prop-types';
import StaffTable from "~/components/Client/Staff";
import {staff_table_header} from "~/asset/data/staff-table-header";
import NotFoundData from "~/components/commoms/NotFoundData";
import './style.scss'
import {FaUser, FaUsers} from "react-icons/fa";

ManageStaff.propTypes = {

};

function ManageStaff(props) {
    const data_staff_table=[
        {id:1,
            first_name:'Dương Hoài Bảo',
            last_name:'Trung',
            phone_number:'08844148784',
            gender:'nam',
            birth_date:'01-10-2008',
            mail:'teoalu@gmail.com',
            role:'staff',
            avatar:'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
            address:'HCM',
            status:1,
        },
        {id:2,
            first_name:'Lê Phạm',
            last_name:'Ngân',
            phone_number:'08844148784',
            gender:'nữ',
            birth_date:'01-10-2008',
            mail:'nganxulaku@gmail.com',
            role:'staff',
            avatar:'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
            address:'HCM',
            status:1,}
    ]
    const data_staff_table_header = [...staff_table_header];
    const [data, setData] = React.useState(data_staff_table);

    return (
        <div className='container-staff'>

            <div className='header-staff-page'>
               <div className='title'>
                   <FaUsers className='icon-staff' />
                   <h4>Danh Sách Nhân Viên</h4>
               </div>
                <div className='filter-staff-page'>
                </div>
            </div>
            <div className='content-staff-page'>
                {data.length > 0 ? (
                    <StaffTable tableHeader={data_staff_table_header} tableBody={data} />
                ) : (
                    <NotFoundData />
                )}
            </div>
        </div>
    );
}

export default ManageStaff;