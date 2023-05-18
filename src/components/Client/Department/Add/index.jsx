import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Form, Input,} from "antd";
import {useForm, Controller} from "react-hook-form";

AddDepartment.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

function AddDepartment({onCancel, onSave}) {
    const { control, handleSubmit, formState: { errors } } = useForm();

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
                encType="multipart/form-data"
                style={{}}
                onFinish={handleSubmit(onSave)}
                labelAlign={"left"}
                className='row-frame'>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item
                            label="Tên phòng"
                            hasFeedback
                            validateStatus={errors.name ? 'error' : 'success'}
                            help={errors.name ? 'Vui lòng nhập tên phòng' : null}>

                            <Input  {...field} size="middle" className='ant-input-no-radius '/>
                        </Form.Item>
                    )}
                />

                <div className="box-footer">
                    <button key="2" className='btn-cancel' onClick={onCancel}>Hủy</button>
                    <button key="3" className='btn-confirm' type='submit'>Lưu</button>
                </div>

            </Form>

        </div>
    );
}

export default AddDepartment;
