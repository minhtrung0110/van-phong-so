import React from 'react';
import PropTypes from 'prop-types';
import HeaderContent from "~/components/commoms/HeaderContent";
import './style.scss'
EditDepartment.propTypes = {

};

function EditDepartment(props) {
    return (
        <div className="edit-department-container">
            <HeaderContent title='Cập Nhật Phòng Ban'/>
        </div>
    );
}

export default EditDepartment;