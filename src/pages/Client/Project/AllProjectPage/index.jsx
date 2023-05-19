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

    const setProject = (respond, value) => {
        setListProject(respond.results);
        if (value !== 'page') {
            setPage(1);
        }
        setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
    useEffect(()=>{
        async function fetchDataProject() {
            const project=JSON.parse(localStorage.getItem('project'))
            let params = {};
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
        fetchDataProject();
    },[search])
    const handlePageChange = async (page) => {
        setPage(page);
        setLoading(true);
        const respond = await getListProjects({
            page,
        });
        console.log('Data respond:', respond)
        if (respond === 401) {
            handleSetUnthorization();
            return false;
        } else if (respond === 500) {
            setListProject([])
            return false;
        } else {
            setProject(respond, 'page');
            setLoading(false);
        }
    };
    const handleLoading = async (value='desc', action) => {
        setLoading(true);
        const obSort=(action==='add')?`created_at`:`updated_at`
        const respond = await getListProjects({
            sort: obSort
        });
        if (respond === 401) {
            handleSetUnthorization();
            return false;
        } else if (respond === 500) {
            setListProject([])
            return false;
        } else {
            setProject(respond, 'reset-page');
            setLoading(false);
        }
    };

    const handleDeleteProject=async (item) => {
        console.log('Delete project:', {...item,status:-1})
        const result = await disableProject({...item,status:-1})
        if (result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
          //  await handleLoading('desc', 'edit')
        }else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });

        }
    }
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    return (
     <>
         {
             isAddProject ?(
                 <AddProject onBack={handleLoading} />
             ):(
                 isEditProject ? (
                     <EditProject onBack={handleLoading}/>
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
                                                       onDelete={handleDeleteProject}/>
                                     ) : (
                                         <NotFoundData/>
                                     )

                                 }
                                 {totalRecord >= 6 && (
                                     <PaginationUI
                                         handlePageChange={handlePageChange}
                                         perPage={10}
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