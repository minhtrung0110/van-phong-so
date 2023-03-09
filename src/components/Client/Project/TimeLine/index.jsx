import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Badge, Calendar, Modal} from "antd";
import dayjs from "dayjs";
import {isEmpty} from "lodash";
import styles from "./style.scss"
import {getListNameColumn, mapOrder} from "~/utils/sorts";
import {initialData} from "~/asset/data/initalDataTask";
import {listColorStateDefaults} from "~/asset/data/defaullt_data_task";
import DetailTask from "~/components/Client/Task/DetailTask";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {useDispatch} from "react-redux";
import {setDetailTask, setTask} from "~/redux/reducer/task/taskReducer";
TimeLine.propTypes = {
    
};

function TimeLine({board}) {
    const [timeLine,setTimeLine]=useState([])
    const [isOpenDetailTask,setIsOpenDetailTask]=useState(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!isEmpty(board)){
            const data=   board.columns.reduce((acc,value) =>{
                return acc.concat(value.cards.map((card)=>({...card,status:value.title})))
            },[])
            setTimeLine(data)
        }
        console.log(timeLine)
    },[board])

    const getTaskInDate=(date) => {
        return timeLine.filter(task=> {
           return  dayjs(task.endTime, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY')===dayjs(date).format('DD/MM/YYYY')
        })
    }
    const getListData = (value) => {
       // console.log(value.date(),getTaskInDate(value))
        //   console.log('date: ',value.date())
       // console.log(dayjs(value).format('DD/MM/YYYY'))
        const listTask=getTaskInDate(value)
        let listData=listTask.map((item)=>({
            title: item.title,
            status: item.status,
            columnId: item.columnId
        }))

        return listData || [];
    };

    const dateCellRender = (value) => {
        const listData = getTaskInDate(value)
       // console.log(listData)
        return (
            <ul className="list-task-events">
                {listData.map((item) => {
                    return (
                        <li key={item.title} className="task-event-item" onClick={()=>handleOpenDetailTask(item)}>
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="footer">
                            <span className={` status status-${item.columnId}`}  >
                                {item.status}
                            </span>

                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    // Task UI

  //  console.log(listState)
    const handleOpenDetailTask = (item)=>{
        setIsOpenDetailTask(true)
        dispatch(setDetailTask(item))
    }
    return (
        <div className='timeline-project'>
            <Calendar dateCellRender={dateCellRender} mode={'month'} />
            <Modal
                title=""
                onCancel={()=>setIsOpenDetailTask(false)}
                footer={null}
                width={800}
                style={{ top: 80 }}
                open={isOpenDetailTask}
            >
                <DetailTask/>
            </Modal>
            {/*<ConfirmModal open={showConfirmModal} title='Xác Nhận Xóa' content={`Bạn Có Thực Sự Muốn Xóa Cột ${columnTitle} Này ? `}*/}
            {/*              textCancel='Hủy' textOK='Xóa' onCancel={()=>setShowConfirmModal(false)} onOK={handleRemoveColumn}/>*/}

        </div>
    );
}

export default TimeLine;