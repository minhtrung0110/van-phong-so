import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import NotFoundData from "~/components/commoms/NotFoundData";
import DepartmentTable from "~/components/Client/Department";
import {department_table_header} from "~/asset/data/department-table-header";
import PaginationUI from "~/components/commoms/Pagination";
import { FaRegBuilding, FaSearch} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {Button, Modal, Tooltip,message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {isEditDepartmentSelector, isResetDepartmentSelector} from "~/redux/selectors/department/departmenrSelector";
import EditDepartment from "~/components/Client/Department/Edit";
import AddDepartment from "~/components/Client/Department/Add";
import {setIsEdit, setIsReset} from "~/redux/reducer/department/departmentReducer";
import ListPageSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {listDepartments} from "~/asset/data/initDataGlobal";
import FilterSelect from "~/components/commoms/FilterSelect";
import {createDepartment, getListDepartments} from "~/api/Client/Department/departmentAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {isEmpty} from "lodash";
import {authorizationFeature} from "~/utils/authorizationUtils";

ManageDepartment.propTypes = {};
const listStatus = [
    {
        id: '1x',
        label: 'Hoạt Động',
        value: 1,
    },
    {
        id: '2x',
        label: 'Thôi Việc',
        value: 0,
    },
    {
        id: '3x',
        label: 'Tất Cả',
        value: 'all',
    },
]
function ManageDepartment(props) {
    const [data, setData] = useState(listDepartments)
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const isEdit = useSelector(isEditDepartmentSelector)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState({role:'all',status:'all'})
    const [messageApi, contextHolder] = message.useMessage();
    const isReset=useSelector(isResetDepartmentSelector)
    const userLogin=useSelector(getUserSelector)
    const createPermission =!isEmpty(userLogin) && authorizationFeature(userLogin.permission,'Department','create')
    const editPermission =!isEmpty(userLogin) && authorizationFeature(userLogin.permission,'Department','update')
    const deletePermission =!isEmpty(userLogin) && authorizationFeature(userLogin.permission,'Department','delete')
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        const result = await getListDepartments({
            page,
        });
        if (result === 401) {
        } else if (result === 500) {
            return false;

        } else {
            setDepartment(result, 'page');
        }
        setLoading(false);
    };
    const handleOpenAddDepartment = () => {
        setIsModalOpen(true);
    }
    const handleCancelAdd = () => {
        setIsModalOpen(false);
    };
    const handleCancelEdit = () => {
       dispatch(setIsEdit(false))
    };
    const handleFilterStatus=(value) => {
        const stt={status:value}
        setFilter(prev=>({...prev,...stt}))
    }


    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const setDepartment = (respond, value) => {
        setData(respond.results);
        if (value !== 'page') {
            setPage(1);
        }
        setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
    const handleCreateDepartment = async (data) => {
        console.log('Create Department: ', data)
        const response = await createDepartment({name:data.name,status:true});
        if(response.status===1){
            messageApi.open({
                type: 'success',
                content: response.message,
                duration: 1.35,
            });
            dispatch(setIsReset(true))
        }
        else if(response.status===0){
            messageApi.open({
                type: 'error',
                content: response.message,
                duration: 1.4,
            });
        }
        setIsModalOpen(false);
    }

    const handleDeleteDepartment = (data)=>{
        console.log('Delete Department: ',data)
    }
    useEffect(() => {
        async function fetchDataDepartment() {
            //  setLoading(true)
            console.log('Search:', search, ' - Filter:', filter)
            let params = {};
            if (filter.status !== 'all') params = { ...params, filter };
            if (search !== '') params = { ...params, filter, search };
            const respond = await getListDepartments(params);
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setData([])
                return false;
            } else {
                setDepartment(respond, 'reset-page');
            }
            setLoading(false);
        }
        fetchDataDepartment();
    }, [search, filter,isReset]);
    const backToDepartmentList = async (action) => {
        setLoading(true);
        let sort=(action === 'edit') ? 'updated_at': 'created_at,desc';
        const result = await getListDepartments({
            sort,
        });
        setDepartment(result, 'page');
        setLoading(false);
    };
    return (
        <>
            {!!isEdit ? (<EditDepartment onCancel={handleCancelEdit}  onBack={backToDepartmentList}   />):(
                (
                  !!loading ?(<ListPageSkeleton column={5} lengthItem={5} /> ):
                      (  <div className='container-department'>
                          <div className='header-department-page'>
                              <div className='title '>
                                  <FaRegBuilding className='icon'/>
                                  <h3> Danh Sách Phòng Ban</h3>
                              </div>
                              <div className='filter-department-page'>
                                  <div className='filter-group'>
                                      <FilterSelect listOptions={listStatus} width='15.2rem'
                                                    title={'Trạng thái'}
                                                    background={'#de935e'}
                                                    onFilter={handleFilterStatus}/>
                                  </div>
                                  <div className='search-excel'>
                                      <SearchHidenButton height='2.4rem' width='18rem' searchButtonText={<FaSearch/>}
                                          onSearch={setSearch}               backgroundButton='#479f87'/>
                                      {/*<Tooltip title='Nhập File Excel' color={'#2F8D45FF'} key={'import'}>*/}
                                      {/*    <Button className='btn'><FaFileUpload className='icon'/></Button>*/}
                                      {/*</Tooltip>*/}
                                      {/*<Tooltip title='Xuất File Excel' color={'#2F8D45FF'} key={'export'}>*/}
                                      {/*    <Button className='btn'><FaFileDownload className='icon'/></Button>*/}
                                      {/*</Tooltip>*/}
                                      {
                                          createPermission && (
                                              <Button className='btn-add'
                                                      onClick={handleOpenAddDepartment}>Tạo Mới </Button>
                                          )
                                      }
                                  </div>
                              </div>

                          </div>
                          <div className='content-department-page'>
                              {
                                  data.length > 0 ? (
                                      <DepartmentTable
                                          editItem={editPermission}
                                          deleteItem={deletePermission}
                                          tableHeader={department_table_header} tableBody={data} onDelete={handleDeleteDepartment} />
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
                      </div>)
                )

            )
            }
            <Modal title="Tạo Mới Phòng Ban" open={isModalOpen}
                   maskClosable={true}
                   onCancel={handleCancelAdd}
                   footer={null}
                   width={700}
                   destroyOnClose={true}
                   style={{top: 150}}
            >
              <AddDepartment onCancel={handleCancelAdd} onSave={handleCreateDepartment} />
            </Modal>
            {contextHolder}

        </>
    )
        ;
}

export default ManageDepartment;