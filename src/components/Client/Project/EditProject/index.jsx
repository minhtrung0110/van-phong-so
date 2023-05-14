import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Input} from "antd/lib";
import {listDepartments, listStaffs} from "~/asset/data/initDataGlobal";
import {Form, Select} from "antd";
import {Controller, useForm} from "react-hook-form";


function EditProject({project,onCancel,onSave}) {
 //   console.log(project)
    const [listStaff, setListStaff] = useState()
    const defaultMembers=project.listMembers.map(item=>({value: item.mail, label: item.username}))
    const defaultStatus=project.status===1?'Hoàn Thành':(project.status===0?'Đang Triển Khai':'Chờ')
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({
        defaultValues:{...project,listMembers:defaultMembers,status:defaultStatus}
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
    const listStatus=[
        {label:'Hoàn Thành',value:'1'},
        {label:'Đang Triển Khai',value:'0'},
        {label:'Chờ',value:'-1'},
    ]
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
                <div className='status'>
                    <h4>Trạng Thái: </h4>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={''}
                        rules={{required: true}}
                        render={({field}) => (
                            <Form.Item
                                hasFeedback
                                validateStatus={errors.status ? 'error' : 'success'}
                                help={errors.status ? 'Vui lòng chọn trạng thái' : null}>
                                <Select
                                    {...field}

                                    size={'large'}
                                    placeholder="Chọn trạng thái ..."

                                    style={{
                                        width: '100%',
                                    }}
                                    options={listStatus}
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