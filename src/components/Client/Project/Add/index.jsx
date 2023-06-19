import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Input} from "antd/lib";
import {listDepartments, listStaffs} from "~/asset/data/initDataGlobal";
import {Form, message, Select} from "antd";
import {Controller, useForm} from "react-hook-form";
import HeaderContent from "~/components/commoms/HeaderContent";
import {FaFolderPlus} from 'react-icons/fa'
import {Option} from "antd/es/mentions";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import {useDispatch, useSelector} from "react-redux";
import {setIsAdd} from "~/redux/reducer/project/projectReducer";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {getListDepartments} from "~/api/Client/Department/departmentAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {getListStaffsByDepartmentId} from "~/api/Client/Staff/staffAPI";
import {isEmpty} from "lodash";
import {createProject} from "~/api/Client/Project/projectAPI";


function AddProject({onBack}) {
    const [listStaff, setListStaff] = useState([])
    const [listRoom, setListRoom] = useState([])
    const [departmentId,setDepartmentId] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch =useDispatch()
    const userLogin=useSelector(getUserSelector)
    console.log(departmentId)
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const    fetchDataDepartment  = async () => {
        const respond = await getListDepartments();
        console.log('Data respond:', respond)
        if (respond === 401) {
            handleSetUnthorization();
            return false;
        } else if (respond === 500) {
            setListRoom([])
            return false;
        } else {
            setListRoom(mixDataDepartments(respond.results));
        }
    }
    const    fetchDataStaffs = async (id) => {
        const respond = await getListStaffsByDepartmentId (id);
        console.log('Data respond:', respond)
        if (respond === 401) {
            handleSetUnthorization();
            return false;
        } else if (respond === 500) {
            setListStaff([])
            return false;
        } else {
            setListStaff(respond);
        }
    }
    const {
        control, handleSubmit,setValue, formState: {errors, isDirty, dirtyFields},
    } = useForm({});
    useEffect(() => {
        setValue('member_ids',[])
        fetchDataDepartment()
    }, [])
    const handleChoseDepartment=(id) => {
        setValue('department_id',id)
        setValue('member_ids',[])
        fetchDataStaffs(id)


    }
    const onSubmit = async (data) => {
        const member_ids=data.member_ids.map((member) =>{
            return listStaff.find(item => item.email===member).ID
        })
        member_ids.push(userLogin.id)
        const newProject = {...data,member_ids,status:0, created_by: userLogin,}
        console.log(newProject)
        const result = await createProject(newProject)
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            setTimeout(() => handleCancel(), 300)
            onBack('desc', 'add')
        } else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
        }

    }
    const mixDataDepartments =(data)=>{
        return data.map(item=>({value:item.id, label:item.name,status:1}))
    }
    const filterOption = (input, option) => {
        //validate nó ẽ kiễm tra xem khớp với value hoăc label koo

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input))
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        else return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    const handleCancel=()=>{
        dispatch(setIsAdd(false))
    }
    return (
        <>
            <HeaderContent title={'Thêm Dự Án Mới '} icon={FaFolderPlus} />
            <div className="container-create-project">

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
                                        onChange={(e) =>handleChoseDepartment(e)}
                                        placeholder="Chọn phòng ban ..."/>
                                </Form.Item>
                            )}
                        />

                    </div>
                    <div className='members'>
                        <h4 className='lable'>Thêm Thành Viên: </h4>
                        <Controller
                            name="member_ids"
                            control={control}
                            defaultValue=""
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    hasFeedback
                                    validateStatus={errors.member_ids ? 'error' : 'success'}
                                    help={errors.member_ids ? 'Vui lòng chọn thành viên' : null}>
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
                                           !isEmpty(listStaff) && listStaff.map((item, i) =>(
                                                <Option key={i}
                                                        value={item.email} label= {item.full_name}
                                                >
                                                 <div   style={{
                                                     display:'flex',
                                                     alignItem:'center',
                                                     justifyContent: 'flex-start',
                                                 }}>
                                                     <AvatarCustom lastName={item.full_name} avatar={item.avatar_url} size={'small'}/>

                                                     <span  style={{
                                                         marginLeft:'1rem',
                                                         fontSize:'0.75rem',
                                                         fontStyle:'italic',
                                                         fontWeight:'bold',
                                                     }}
                                                     >{item.full_name}</span>
                                                 </div>
                                                </Option>
                                            ))
                                        }
                                    </Select>
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

export default AddProject;