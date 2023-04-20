import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Form, Input,} from "antd";
import {useForm, Controller} from "react-hook-form";

AddGroup.propTypes = {};

function AddGroup({onCancel, onSave}) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [value, setValue] = useState('')

    return (
        <div className="add-group-container">
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
                    name="roomName"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item
                            label="Tên nhóm mới"
                            hasFeedback
                            validateStatus={errors.roomName ? 'error' : 'success'}
                            help={errors.roomName ? 'Vui lòng nhập tên nhóm' : null}>

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

export default AddGroup;
