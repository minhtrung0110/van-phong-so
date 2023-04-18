import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
ManageCompany.propTypes = {

};

function ManageCompany(props) {
    return (
        <div className='container-setting'>
            <HeaderContent title={'Thông tin tổ chức'} />
            <div className='box-title'>

            </div>
            <div className='box-avatar'>

            </div>
        </div>
    );
}

export default ManageCompany;