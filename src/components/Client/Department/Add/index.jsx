import React from 'react';
import PropTypes from 'prop-types';
import HeaderContent from "~/components/commoms/HeaderContent";
import './style.scss'
import {AutoComplete, Cascader, Col, DatePicker, Form, Input, Radio, Row, Upload} from "antd";
import {FaPlus} from "react-icons/fa";
AddDepartment.propTypes = {

};

function AddDepartment({onCancel,onSubmit}) {
    return (
        <div className="add-department-container">
            <Form
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"

                style={{}}
                labelAlign={"left"}
                className='row-frame'>
                    <div className='col-left' xs={{ span: 24}} lg={{ span: 12}}>
                        <Form.Item
                            name="name "
                            label="Nhập Tên Phòng Mới"
                            tooltip="Điền đầy đủ - chính xác thông tin này"


                            rules={[

                                {
                                    required: true,
                                    message: 'Vui lòng điền họ và tên đệm!',
                                },
                            ]}
                        >
                            <Input size="middle" name='name' className='ant-input-no-radius '/>
                        </Form.Item>

                    </div>
                <div className="box-footer">
                    <button key="2"  className='btn-cancel' onClick={onCancel}>Hủy</button>
                    <button key="3" className='btn-confirm' type='submit'  onClick={onSubmit}>Lưu</button>
                </div>

            </Form>

        </div>
    );
}

export default AddDepartment;