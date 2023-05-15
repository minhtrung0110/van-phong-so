import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Input} from "antd/lib";
import {listDepartments, listStaffs} from "~/asset/data/initDataGlobal";
import {Form, message, Select} from "antd";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {projectSelector} from "~/redux/selectors/project/projectSelector";
import {Option} from "antd/es/mentions";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import HeaderContent from "~/components/commoms/HeaderContent";
import {FaFolderPlus} from "react-icons/fa";
import {setIsAdd, setIsEditProject} from "~/redux/reducer/project/projectReducer";
import {editProject} from "~/api/Client/Project/projectAPI";


function EditProject({onBack}) {
    const  project=useSelector(projectSelector)
    console.log(project)
    const [listRoom, setListRoom] = useState([])
    const [listStaff, setListStaff] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const defaultMembers= !!project.members && project.members.map(item=>({value: item.mail, label:  `${item.first_name} ${item.last_name}`}))
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({
        defaultValues:{...project,members:[defaultMembers]}
    });
    const dispatch=useDispatch()

    const handleCancel=()=>{
        dispatch(setIsEditProject(false))
    }
    useEffect(() => {
        // call API get listDepartment
        setListRoom(mixDataDepartments(listDepartments))
        // call API get listStaff
        const data = listStaffs.map((item) => ({value: item.mail, label: `${item.first_name} ${item.last_name}`}))
        setListStaff(data)
    }, [])
    const onSubmit = async (data) => {
        const result = await editProject({...data,members:[]});
        if(result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
         //   onBack('desc', 'edit')
            handleCancel()
        }
        else if(result.status===401){

        }
        else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
        }
        //
    }
    const mixDataDepartments =(data)=>{
        return data.map(item=>({value:item.id, label:item.name}))
    }

    const filterOption = (input, option) => {
        //validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input))
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        else return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    const listStatus=[
        {label:'Hoàn Thành',value:1},
        {label:'Đang Triển Khai',value:0},
        {label:'Chờ',value:-1},
    ]
    return (
        <>
            {contextHolder}
            <HeaderContent title={'Cập Nhật Dự Án'} icon={FaFolderPlus} />
            <div className="container-update-project">
                <Form

                    layout="horizontal"
                    style={{}}
                    onFinish={handleSubmit(onSubmit)}
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
                    <div className='input-title'>
                        <h4 className='lable'>Phòng Ban</h4>
                        <Controller
                            name="department_id"
                            control={control}
                            defaultValue=""
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    hasFeedback
                                    validateStatus={errors.department_id ? 'error' : 'success'}
                                    help={errors.department_id ? 'Chọn phòng ban' : null}>
                                    <Select
                                        options={listRoom}
                                        {...field}  className='input' size="large"
                                        placeholder="Chọn phòng ban ..."/>
                                </Form.Item>
                            )}
                        />

                    </div>
                    <div className='members'>
                        <h4 className='lable'>Thêm Thành Viên: </h4>
                        <Controller
                            name="members"
                            control={control}
                            defaultValue=""
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    hasFeedback
                                    validateStatus={errors.members ? 'error' : 'success'}
                                    help={errors.members ? 'Vui lòng chọn thành viên' : null}>
                                    {/*<Select*/}
                                    {/*    {...field}*/}
                                    {/*    showSearch*/}
                                    {/*    mode="multiple"*/}
                                    {/*    size={'large'}*/}
                                    {/*    placeholder="Email, tên đăng nhập ..."*/}
                                    {/*    filterOption={filterOption}*/}
                                    {/*    filterSort={(optionA, optionB) =>*/}
                                    {/*        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())*/}
                                    {/*    }*/}
                                    {/*    style={{*/}
                                    {/*        width: '100%',*/}
                                    {/*    }}*/}
                                    {/*    options={listStaff}*/}
                                    {/*/>*/}
                                    <Select
                                        {...field}
                                        showSearch
                                        mode="multiple"
                                        size={'large'}
                                        placeholder="Email hoặc tên ..."
                                        style={{
                                            width: '100%',
                                        }}
                                        popupClassName={'select-member-custom'}
                                        filterOption={filterOption}
                                    >
                                        {
                                            listStaffs.map((item, i) =>(
                                                <Option key={i}
                                                        value={ item.mail} label={ `${item.first_name} ${item.last_name}`}
                                                >
                                                    <div   style={{
                                                        display:'flex',
                                                        alignItem:'center',
                                                        justifyContent: 'flex-start',
                                                    }}>
                                                        <AvatarCustom lastName={item.last_name} avatar={item.avatar} size={'small'}/>

                                                        <span  style={{
                                                            marginLeft:'1rem',
                                                            fontSize:'0.75rem',
                                                            fontStyle:'italic',
                                                            fontWeight:'bold',
                                                        }}
                                                        >{`${item.first_name} ${item.last_name}`}</span>
                                                    </div>
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>

                            )}
                        />

                    </div>
                    <div className='status'>
                        <h4>Trạng Thái: </h4>
                        <Controller
                            name="status"
                            control={control}
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
                        <button key="2" className='btn-cancel' onClick={handleCancel}>Hủy</button>
                        <button key="3" className={`btn-confirm  ${!isDirty ? 'disabled' : ''}`} type='submit'>Lưu</button>
                    </div>

                </Form>
            </div>
        </>
    );
}

export default EditProject;