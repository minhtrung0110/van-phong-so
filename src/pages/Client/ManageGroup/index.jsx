import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {
    FaAngleLeft,
    FaArrowLeft,
    FaFileDownload,
    FaFileUpload,
    FaForward,
    FaRegBuilding,
    FaSearch
} from "react-icons/fa";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {Breadcrumb, Button, Modal, Tooltip} from "antd";
import GroupTable from "~/components/Client/Group";
import {group_table_header} from "~/asset/data/group_table_header";
import NotFoundData from "~/components/commoms/NotFoundData";
import PaginationUI from "~/components/commoms/Pagination";
import {listGroups} from "~/asset/data/initDataGlobal";
import {useDispatch, useSelector} from "react-redux";
import {isEditGroupSelector} from "~/redux/selectors/group/groupSelector";
import {NavLink} from "react-router-dom";
import {config} from "~/config";
import {departmentSelector} from "~/redux/selectors/department/departmenrSelector";
import AddDepartment from "~/components/Client/Department/Add";
import AddGroup from "~/components/Client/Group/Add";
import ListPageSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
ManageGroup.propTypes = {

};

function ManageGroup(props) {

    const [data, setData] = useState(listGroups)
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const isEdit = useSelector(isEditGroupSelector)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search,setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')
    const department=useSelector(departmentSelector)
    useEffect(()=>{
        // call API
        console.log('calling API:', department.id)
        console.log('Search-Filter :', search,filter)
    },[data,filter,search])
    const handleOpenAddGroup=()=>{
        setIsModalOpen(true)
    }
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        // const result = await getAllStaffs({
        //     page,
        // });
        // if (result === 401) {
        // } else if (result === 500) {
        //     return false;
        // } else {
        //     setStaff(result, 'page');
        // }
        setLoading(false);
    };
    const handleCancelAdd=() => {
        setIsModalOpen(false)
    }
    const handleCreateNewGroup=(data)=>{
        setIsModalOpen(false);
        console.log( 'Create group: ',data)
        //call api
    }
    const handleUpdateGroup=(data)=>{
        console.log('Update group: ',data)
    }
    const handleDeleteGroup=(data)=>{
        console.log('Delete group: ',data)
    }
    return (
       <div >
           <div className="header-group">
               <Breadcrumb>
                   <Breadcrumb.Item><NavLink to={config.routes.department}>Phòng Ban</NavLink></Breadcrumb.Item>
                   <Breadcrumb.Item><NavLink to={config.routes.group}>Nhóm</NavLink></Breadcrumb.Item>

               </Breadcrumb>
               <NavLink to={config.routes.department} className={'btn-back'}>
                   <FaArrowLeft />
                   Quay Về</NavLink>
           </div>
           {
               !!loading ?(
                   <ListPageSkeleton column={5} />
               ):(
                   <div className={'container-group'}>
                       <div className='header-group-page'>
                           <div className='title '>
                               <FaRegBuilding className='icon'/>
                               <h4>{` Danh Sách Nhóm Thuộc  ${department.name}`}</h4>
                           </div>
                           <div className='filter-group-page'>
                               <div className='filter-group'>
                                   <FilterRadiobox width='15.2rem' onFilter={setFilter}/>

                               </div>
                               <div className='search-excel'>
                                   <SearchHidenButton height='2.4rem' width='18rem' searchButtonText={<FaSearch/>}
                                                      onSearch={setSearch}                backgroundButton='#479f87'/>
                                   <Button className='btn-add'
                                           onClick={handleOpenAddGroup}>Tạo Mới </Button>


                               </div>
                           </div>

                       </div>
                       <div className='content-group-page'>
                           {
                               data.length > 0 ? (
                                   <GroupTable tableHeader={group_table_header} tableBody={data}
                                               onDelete={handleDeleteGroup} onUpdate={handleUpdateGroup}
                                   />
                               ) : (
                                   <NotFoundData/>
                               )

                           }
                           {totalRecord >= 5 && (
                               <PaginationUI
                                   handlePageChange={handlePageChange}
                                   perPage={5}
                                   totalRecord={totalRecord}
                                   currentPage={page}
                               />
                           )}

                       </div>
                       <Modal title="Tạo Mới Nhóm" open={isModalOpen}
                              maskClosable={true}
                              onCancel={(handleCancelAdd)}
                              footer={null}
                              width={700}
                              style={{top: 150}}
                       >
                           <AddGroup onCancel={handleCancelAdd} onSave={handleCreateNewGroup} />
                       </Modal>

                   </div>
               )
           }

       </div>
    );
}

export default ManageGroup;