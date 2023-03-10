import React from 'react';
import PropTypes from 'prop-types';
import  './style.scss'
import {Form, Input} from "antd";
import {FaLock} from "react-icons/fa";
import {Controller, useForm} from "react-hook-form";
ManageMyAccount.propTypes = {

};

function ManageMyAccount(props) {
    const {
        control, handleSubmit, formState: { errors, isDirty, dirtyFields },
    } = useForm(   )
    const onSubmit = (data) => console.log({ data,errors, isDirty, dirtyFields });
    return (
        <div className='my-account-page'>
            <div className='header-changed-password'>
                <FaLock className='icon' />
                <span className='title'> Đổi Mật Khẩu</span>
               </div>
            <Form
                onFinish={handleSubmit(onSubmit)}
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"

                style={{}}
                labelAlign={"left"}
                className='form-changed-password'>
                <Controller
                    name="current-password"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item
                            label="Mật Khẩu Hiện Tại"
                            tooltip="Điền mật khẩu của tài khoản đang đăng nhập"
                            className='form-item'
                            hasFeedback
                            validateStatus={errors.name ? 'error' : 'success'}
                            help={errors.name ? 'Vui lòng nhập mật khẩu hiện tại' : null}>

                            <Input.Password  {...field} size="middle" className='ant-input-no-radius '/>
                        </Form.Item>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item
                            label="Mật Khẩu Mới"
                            tooltip="Điền mật khẩu của tài khoản đang đăng nhập"
                            className='form-item'
                            hasFeedback
                            validateStatus={errors.name ? 'error' : 'success'}
                            help={errors.name ? 'Vui lòng nhập mật khẩu mới' : null}>

                            <Input.Password  {...field} size="middle" className='ant-input-no-radius '/>
                        </Form.Item>
                    )}
                />
                <Controller
                    name="confirm"
                    control={control}
                    defaultValue=""
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu như',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            },
                        }),
                    ]}
                    render={({field}) => (
                        <Form.Item
                            label="Xác Nhận Mật Khẩu"
                            tooltip="Điền mật khẩu của tài khoản đang đăng nhập"
                            className='form-item'

                            hasFeedback

                            validateStatus={errors.name ? 'error' : 'success'}
                            help={errors.name ? 'Vui lòng nhập mật khẩu mới' : null}>

                            <Input.Password  {...field} size="middle" className='ant-input-no-radius '/>
                        </Form.Item>
                    )}
                    />
                {/*/>*/}
                {/*<Form.Item*/}
                {/*    name="confirm"*/}
                {/*    label="Xác Nhận Mật Khẩu"*/}
                {/*    dependencies={['password']}*/}
                {/*    hasFeedback*/}
                {/*    className='form-item'*/}
                {/*    rules={[*/}
                {/*        {*/}
                {/*            required: true,*/}
                {/*            message: 'Vui lòng nhập mật khẩu như',*/}
                {/*        },*/}
                {/*        ({ getFieldValue }) => ({*/}
                {/*            validator(_, value) {*/}
                {/*                if (!value || getFieldValue('password') === value) {*/}
                {/*                    return Promise.resolve();*/}
                {/*                }*/}
                {/*                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));*/}
                {/*            },*/}
                {/*        }),*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Input.Password  size="middle" name='confirm' className='ant-input-no-radius '/>*/}
                {/*</Form.Item>*/}
                <div className='footer-changed-password'>
                    <button className='btn-cancel'>Hủy</button>
                    <button className='btn-save'  type='submit'>Lưu</button>
                </div>

            </Form>
        </div>
    );
}

export default ManageMyAccount;