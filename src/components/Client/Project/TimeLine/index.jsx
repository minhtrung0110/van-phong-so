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
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
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

       const data=timeLine.filter(task=> {
          return  dayjs(task.endTime, 'DD/MM/YYYY HH:mm:ss').format('MM') ===dayjs(value).format('MM')
        })
        console.log(data)
        const countByColumnId = {};
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const columnId = item.status;
            if (countByColumnId[columnId]) {
                countByColumnId[columnId]++;
            } else {
                countByColumnId[columnId] = 1;
            }
        }
        console.log({listStatus:Object.entries(countByColumnId).map(([key, value]) => ({ key, value }))
            ,totalTask:data.length})
        return {listStatus:Object.entries(countByColumnId).map(([key, value]) => ({ key, value }))
            ,totalTask:data.length}
    };
   //console.log(board)
    const monthCellRender = (value) => {
        const dataStatistic = getMonthData(value);
        return dataStatistic.totalTask>0 ? (
            <div className="notes-month">
                <div className="total-task">Công Viêc: {dataStatistic.totalTask}</div>
                <section className='statistic'>
                    {
                        !!dataStatistic.listStatus && dataStatistic.listStatus.map((item)=>(
                            <div className="status-item">
                                <span className="title">{item.key}: </span>
                                <span className="num">{item.value}</span>
                            </div>
                        ))

                    }
                </section>

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
            <Calendar dateCellRender={dateCellRender}  monthCellRender={monthCellRender} />
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


        </div>
    );
}

export default TimeLine;