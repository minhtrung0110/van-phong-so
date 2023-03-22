import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import GroupMember from "~/components/Client/Task/GroupMember";
import {Input} from "antd/lib";
import HeaderContent from "~/components/commoms/HeaderContent";
import {FaArrowLeft, FaCut, FaTrashAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setIsCreateProject} from "~/redux/reducer/project/projectReducer";
import {listDepartments, listStaffs} from "~/asset/data/initDataGlobal";
import {Select} from "antd";
import TextArea from "antd/es/input/TextArea";
AddProject.propTypes = {

};

function AddProject({onCancel}) {
    const [title,setTitle]=useState()
    const [listDepartment,setListDepartment]=useState(listDepartments)
    const [listStaff,setListStaff]=useState()

    const dispacth=useDispatch()
    useEffect(()=>{
        // call API
        const data=listStaffs.map((item)=>({value:item.mail,label:item.username}))
        setListStaff(data)
        console.log(data)
    },[])
    const handleBack=()=>{
        dispacth(setIsCreateProject(false))
    }
    const filterOption=(input, option)=> {
        //validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(input))
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        else return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return (
      <div className="container-create-project">
          {/*<HeaderContent title='Tạo Dự Án Mới '  slot={*/}
          {/*    <div className='gr-button'>*/}
          {/*        <button className='btn-back' onClick={handleBack}><FaArrowLeft/> Quay Về*/}
          {/*        </button>*/}
          {/*    </div>*/}
          {/*}/>*/}
          <form className='form-add-project'>

              <div className='input-title'>
                  <h4 className='lable'>Tên Dự Án</h4>
                  <Input className='input' size="large" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nhập tên dự án ..."/>
              </div>
              <div className='members'>
                  <h4 className='lable'>Thêm Thành Viên: </h4>
                        <Select
                            showSearch
                            mode="multiple"
                            size={'large'}
                            placeholder="Email, tên đăng nhập ..."
                            defaultValue={[]}
                            filterOption={filterOption}
                           // filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            // onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={listStaff}
                        />

              </div>


          </form>
      </div>
    );
}

export default AddProject;