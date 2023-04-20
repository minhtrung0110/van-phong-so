import React, {useState} from 'react';
import PropTypes from 'prop-types';
import HeaderContent from "~/components/commoms/HeaderContent";
import './style.scss'
import {Controller, useForm} from "react-hook-form";
import {Form, Input, Radio, Select} from "antd";
import {useSelector} from "react-redux";
import {groupSelector} from "~/redux/selectors/group/groupSelector";
import {Option} from "antd/es/mentions";

EditGroup.propTypes = {};

function EditGroup({onCancel, onSave}) {
    const group = useSelector(groupSelector)
    const {
        control, handleSubmit, formState: { errors, isDirty, dirtyFields },
    } = useForm({
        defaultValues: {...group}
    });

    const onSubmit = (data) => console.log({ data,errors, isDirty, dirtyFields });

    return (
        <div className="edit-group-container">
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
                className='frame-edit-group'>
               <div className="content">
                   <Controller
                       name="id"
                       control={control}
                       defaultValue=""
                       rules={{required: true}}
                       render={({field}) => (
                           <Form.Item label="Mã Nhóm">

                               <Input disabled {...field} size="middle" className='ant-input-no-radius '/>
                           </Form.Item>
                       )}
                   />
                   <Controller
                       name="name"
                       control={control}
                       defaultValue=""
                       rules={{required: true}}
                       render={({field}) => (
                           <Form.Item
                               label="Tên Nhóm"
                               hasFeedback
                               validateStatus={errors.name ? 'error' : 'success'}
                               help={errors.name ? 'Vui lòng nhập tên phòng' : null}>

                               <Input  {...field} size="middle" className='ant-input-no-radius '/>
                           </Form.Item>
                       )}
                   />


                   <Controller
                       name="status"
                       control={control}
                       rules={{required: true}}

                       render={({field}) => (
                           <Form.Item label="Trạng Thái" validateStatus={errors.status ? 'error' : 'success'}
                                      hasFeedback help={errors.status ? 'Vui lòng chọn trạng thái' : null}>
                               <Radio.Group {...field}>
                                   <Radio value={1}>Hoạt Động</Radio>
                                   <Radio value={0}>Vô Hiệu</Radio>
                               </Radio.Group>
                           </Form.Item>
                       )}
                   />
                   <div className="box-footer">
                       <button key="2" className='btn-cancel' onClick={onCancel}>Hủy</button>
                       <button key="3" className={`btn-confirm  ${!isDirty ?'disabled':''}`}   type='submit'>Lưu</button>
                   </div>

               </div>


            </Form>

        </div>
    );
}

export default EditGroup;