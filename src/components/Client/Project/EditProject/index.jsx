import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Input} from "antd/lib";
import {listDepartments, listStaffs} from "~/asset/data/initDataGlobal";
import {Form, Select} from "antd";
import {Controller, useForm} from "react-hook-form";

EditProject.propTypes = {
    project: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

function EditProject({project,onCancel,onSave}) {
 //   console.log(project)
    const [listStaff, setListStaff] = useState()
    const defaultMembers=project.listMembers.map(item=>({value: item.mail, label: item.username}))
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({
        defaultValues:{...project,listMembers:defaultMembers}
    });


    useEffect(() => {
        // call API
        const data = listStaffs.map((item) => ({value: item.mail, label: item.username}))
        setListStaff(data)
    }, [])
    const onSubmit = (data) => {
        console.log(data)
    }
    const filterOption = (input, option) => {
        //validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input))
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        else return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return (
        <div className="container-update-project">
            <Form

                layout="horizontal"
                style={{}}
                onFinish={handleSubmit(onSave)}
                labelAlign={"left"}
                className='form-add-project'>

                <div className='input-title'>
                    <h4 className='lable'>Tên Dự Án</h4>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{required: true}}
                        render={({field}) => (
                            <Form.Item
                                hasFeedback
                                validateStatus={errors.name ? 'error' : 'success'}
                                help={errors.name ? 'Vui lòng nhập tên dự án' : null}>
                                <Input
                                    {...field}  className='input' size="large"
                                    placeholder="Nhập tên dự án ..."/>
                            </Form.Item>
                        )}
                    />

                </div>
                <div className='members'>
                    <h4 className='lable'>Thêm Thành Viên: </h4>
                    <Controller
                        name="listMembers"
                        control={control}
                        defaultValue={''}
                        rules={{required: true}}
                        render={({field}) => (
                            <Form.Item
                                hasFeedback
                                validateStatus={errors.listMembers ? 'error' : 'success'}
                                help={errors.listMembers ? 'Vui lòng chọn thành viên' : null}>
                                <Select
                                    {...field}
                                    showSearch
                                    mode="multiple"
                                    size={'large'}
                                    placeholder="Email, tên đăng nhập ..."
                                    filterOption={filterOption}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    options={listStaff}
                                />
                            </Form.Item>

                        )}
                    />

                </div>
                <div className="box-footer">
                    <button key="2" className='btn-cancel' onClick={onCancel}>Hủy</button>
                    <button key="3" className={`btn-confirm  ${!isDirty ? 'disabled' : ''}`} type='submit'>Lưu</button>
                </div>

            </Form>
        </div>
    );
}

export default EditProject;