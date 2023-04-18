import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaCogs, FaFileDownload, FaFileUpload, FaSearch, FaUserCog} from "react-icons/fa";
import FilterRadiobox from "~/components/commoms/FilterRadiobox";
import SearchHidenButton from "~/components/commoms/SearchHideButton";

import NotFoundData from "~/components/commoms/NotFoundData";
import PaginationUI from "~/components/commoms/Pagination";
import DecentralizeTable from "~/components/Client/Decentralize";
import {listDecentralize} from "~/asset/data/initDataGlobal";
import {decentralize_table_header} from "~/asset/data/decentralize-table-header";
import {useDispatch, useSelector} from "react-redux";
import {
    isAddDecentralizeSelector,
    isEditDecentralizeSelector
} from "~/redux/selectors/decentralize/decentralizeSelector";
import AddRole from "~/components/Client/Decentralize/Add";
import {setIsAdd,setIsEdit} from "~/redux/reducer/decentralize/decentralizeReducer";
import EditRole from "~/components/Client/Decentralize/Edit";
Decentralize.propTypes = {

};

function Decentralize(props) {
    const [data, setData] = useState(listDecentralize)
    const [page, setPage] = React.useState(1);
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [loading, setLoading] = React.useState(false);
    const [filter, setFilter] = React.useState()
    const [search,setSearch]=useState()
    const dispatch=useDispatch()
    const handleAddNewRole=()=>{
        dispatch(setIsAdd(true))
    }
    const handleCreateNewRole=(data)=>{
        console.log('Create new role:', data)
    }
    const handleCancelAddRole=()=>{
        dispatch(setIsAdd(false))
    }
    const handleCancelUpdateRole=()=>{
        dispatch(setIsEdit(false))
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
    const handleUpdateDecentralize = async (item) => {
        console.log('Update Decentralize: ', item)
    };
    const handleRemoveDecentralize = async (id) => {
        console.log('Delete Decentralize: ', id)
        //e.stopPropagation();
        // const result = await deleteDecentralize(id);
        // console.log('result', result);
        // if (result === 200) {
        //     SuccessToast('Remove department successfully', 3000);
        // } else if (result === 404) {
        //     ErrorToast('Remove departments unsuccessfully', 3000);
        //     Notiflix.Block.remove('#root');
        // } else if (result === 401) {
        //     Notiflix.Block.remove('#root');
        // } else {
        //     Notiflix.Block.remove('#root');
        //     ErrorToast('Something went wrong. Please try again', 3000);
        // }
        // dispatch(setIsReset(Math.random()));
    };
    const isAdd=useSelector(isAddDecentralizeSelector)
    const isEdit=useSelector(isEditDecentralizeSelector);
    useEffect(()=>{
        console.log('Search:', search)
        console.log('Filter:', filter)

    },[filter,search])
    return (
    <>
        {
            !!isAdd ? (<AddRole  onSubmit={handleCreateNewRole} onBack={handleCancelAddRole} />)
                :(
                    !!isEdit?(<EditRole onSubmit={handleUpdateDecentralize} onBack={handleCancelUpdateRole} />):(
                        <div className='container-decentralize' >
                            <div className='header-decentralize'>
                                <div className='title'>
                                    <FaUserCog  className={'icon'} />
                                    <b>Phân Quyền</b>
                                </div>
                                <div className='filter-decentralize-page'>
                                    <div className='filter-group'>
                                        <FilterRadiobox width='15.2rem' backGround={'#479f87'} onFilter={setFilter} />
                                    </div>
                                    <div className='search-create'>
                                        <SearchHidenButton height='2.4rem' width='20rem' searchButtonText={<FaSearch/>}
                                                           backgroundButton='#479f87' onSearch={setSearch} />
                                        <button className='btn-add' onClick={handleAddNewRole}>Tạo Mới </button>

                                    </div>
                                </div>
                            </div>
                            <div className='content-decentralize'>
                                {
                                    data.length > 0 ? (
                                        <DecentralizeTable tableHeader={decentralize_table_header} tableBody={data}
                                                           onUpdate={handleUpdateDecentralize}
                                                           onDelete={handleRemoveDecentralize}
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
                        </div>
                    )
                )
        }
    </>
    );
}

export default Decentralize;