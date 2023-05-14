import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaListAlt, FaPlus} from "react-icons/fa";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import NotFoundData from "~/components/commoms/NotFoundData";
import ProjectTable from "~/components/Client/Project";
import {project_table_header} from "~/asset/data/project-table-header";
import {isEmpty} from "lodash";
import {message} from "antd";
import AddProject from "~/components/Client/Project/Add";
import {useDispatch, useSelector} from "react-redux";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import ListTableSkeleton from "~/components/commoms/Skeleton/ListPage/ListPageSkeleton";
import {getListProjects} from "~/api/Client/Sprint/sprintAPI";
import PaginationUI from "~/components/commoms/Pagination";
import {setIsAdd, setIsReset} from "~/redux/reducer/project/projectReducer";
import {
    isAddProjectSelector,
    isEditProjectSelector,
    isResetProjectSelector
} from "~/redux/selectors/project/projectSelector";
import EditProject from "~/components/Client/Project/EditProject";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
import {disableProject} from "~/api/Client/Project/projectAPI";
AllProjectPage.propTypes = {

};

function AllProjectPage(props) {
    const [listProject,setListProject] = useState([])
    const [loading, setLoading] = React.useState(true);
    const [search,setSearch] = useState('')
    const [totalRecord, setTotalRecord] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const isReset=useSelector(isResetProjectSelector)
    const isAddProject=useSelector(isAddProjectSelector)
    const isEditProject=useSelector(isEditProjectSelector)

    const handleUpdateProject=(data) => {
        console.log('Update project:',data)
        messageApi.open({
            type: 'success',
            content: 'Câp nhật dự án thành công',
            duration: 1.3,
        });
    }
    const handleDeleteProject=async (id) => {
        console.log('Delete project:', id)
        const result = await disableProject(id)
        if (result.status===1){
            messageApi.open({
                type: 'success',
                content: 'Xóa dự án thành công',
                duration: 1.3,
            });
            dispatch(setIsReset(true))
        }else {
            messageApi.open({
                type: 'error',
                content: 'Xóa dự án thành công',
                duration: 1.3,
            });

        }

    }
    const setProject = (respond, value) => {
        setListProject(respond.results);
        if (value !== 'page') {
            setPage(1);
        }
        setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
    useEffect(()=>{
        async function fetchData() {
            const project=JSON.parse(localStorage.getItem('project'))
            let params = {};
            // if (filter.status !== 'all' || filter.role!=='all') params = { ...params, filter };
            if (search !== '') params = { ...params, search };
            const respond = await getListProjects(params);
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setListProject([])
                return false;
            } else {
                console.log('Vào')
                setProject(respond, 'reset-page');
                setLoading(false);
            }
        }
        fetchData();

        console.log('Search project:',search)
    },[search,isReset])
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        const result = await getListProjects({
            page,
        });
        if (result === 401) {
        } else if (result === 500) {
            return false;

        } else {
            setProject(result, 'reset-page');
        }
        setLoading(false);
    };
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const backToProjectList = async (value, action) => {
        setLoading(true);
        if (action === 'edit') {
        }
        const result = await getListProjects({
            sort: value,
        });
        setProject(result, 'page');
        setLoading(false);
    };
    return (
     <>
         {
             isAddProject ?(
                 <AddProject onCancel={backToProjectList} />
             ):(
                 isEditProject ? (
                     <EditProject/>
                 ):(
                     !!loading ?(<ListTableSkeleton column={4} />):(
                         <div className={'container-list-project'}>
                             {contextHolder}
                             <div className={'header-list-project'}>
                                 <div className='title'><FaListAlt/>
                                     Danh Sách Dự Án
                                 </div>
                                 <div className={'filter-list-project'}>
                                     <SearchHidenButton width='20rem' onSearch={setSearch} />
                                     <div className={'create-project '} onClick={()=>dispatch(setIsAdd(true))}>
                                         <FaPlus className='icon' />
                                         <span className='text' >Tạo Dự Án</span>
                                     </div>
                                 </div>
                             </div>
                             <div className={'content-list-project'}>
                                 {
                                     !isEmpty(listProject) ? (
                                         <ProjectTable tableHeader={project_table_header} tableBody={listProject}
                                                       onUpdate={handleUpdateProject} onDelete={handleDeleteProject}/>
                                     ) : (
                                         <NotFoundData/>
                                     )

                                 }
                                 {totalRecord >= 1 && (
                                     <PaginationUI
                                         handlePageChange={handlePageChange}
                                         perPage={8}
                                         totalRecord={totalRecord}
                                         currentPage={page}
                                     />
                                 )}
                             </div>

                         </div>
                     )
                 )
             )
         }
     </>
    );
}

export default AllProjectPage;