import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, DatePicker, Dropdown, Input, InputNumber, Select, Tooltip, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {detailTaskSelector} from "~/redux/selectors/project/projectSelector";
import {
    FaCaretDown,
    FaCheckCircle,
    FaDesktop, FaEllipsisH,
    FaFemale,
    FaMale,
    FaPaperclip,
    FaPlus,
    FaRegFlag
} from "react-icons/fa";
import './Detail.scss'
import dayjs from "dayjs";
import CustomEditor from "~/components/commoms/Edittor";
import ToDoList from "~/components/commoms/ToDoList";
import {isEmpty} from "lodash";
import {
    getListNameColumn,
    getListStatusProjecTask,
    getListStatusTaskProject,
    getNameColumn,
    getStatusTaskProject
} from "~/utils/sorts";
import {initialData} from "~/asset/data/initalDataTask";
import {listColorStateDefaults, listPriority} from "~/asset/data/defaullt_data_task";
import SearchSelectModal from "~/components/Client/Task/GroupMember/SearchSelectModal";
import GroupMember from "~/components/Client/Task/GroupMember";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setDeleteTask} from "~/redux/reducer/project/projectReducer";

DetailTask.propTypes = {};

function DetailTask({sprint, isOpen, onUpdateTask, onDeleteTask, onDuplicate}) {

    const data = useSelector(detailTaskSelector)
    const [errorDescription, setErrorDescription] = useState('');
    const [priority, setPriority] = useState(data.priority);
    const [status, setStatus] = useState(getStatusTaskProject(sprint, data.columnId))
    const [listFile, setListFile] = useState([])
    const [point, setPoint] = useState(data.point)
    const [taskTitle, setTaskTitle] = useState(data.title)

    const [rangeValueTime, setRangeValueTime] = useState(
        [dayjs(data.startTime, "DD/MM/YYYY HH:mm:ss"), dayjs(data.endTime, "DD/MM/YYYY HH:mm:ss")]);
    const [members, setMembers] = useState([])
    const dispatch = useDispatch()
    const {RangePicker} = DatePicker;
    // console.log(priority)
    //  useEffect(()=>{
    //          setPriority(data.priority)
    //      return () =>{
    //              setPriority('')
    //      }
    //  },[data])
    const rangePresets = [
        {
            label: 'Trong 7 ngày',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Trong 14 ngày',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Trong 21 ngày',
            value: [dayjs().add(-21, 'd'), dayjs()],
        },
        {
            label: 'Trong 30 ngàys',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Trong 90 ngày',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    //Handles
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else
            console.log('Clear');
        setRangeValueTime([dates[0], dates[1]])
    }
    const editorDescription = (value) => {
        //  setValue('description', value);nay2y2 cho form
        setErrorDescription('');
    };

    const listState = getListStatusTaskProject(sprint)
    const listStateRender = listState.map((item, index) => ({
        label: item.label,
        value: item.id,
        color: listColorStateDefaults[index].color,
        backgroundColor: listColorStateDefaults[index].backgroundColor
    }))
    // console.log(listStateRender)
    // console.log('Status: ',status)
    const fileList = [
        {
            uid: '0',
            name: 'xxx.png',
            status: 'uploading',
            percent: 33,
        },
        {
            uid: '-1',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'zzz.png',
            status: 'error',
        },
    ];

    // Upload  //

    const handleChangeUpload = (info) => {
        setListFile(info.fileList)
    }
    const handleHiddenListFile = () => {
        const elements = document.querySelector('.attach-file .ant-upload-list');
        const icon = document.querySelector('.attach-file .title-upload .icon');

        if (elements.style.display !== 'none') {
            elements.style.display = 'none';
            icon.classList.toggle('rotate');
        } else {
            elements.style.display = 'block';
            icon.classList.toggle('rotate');
        }


    }
    const items = [
        {
            key: 'remove-task',
            label: (
                <span>
                    Xóa Công Việc
                </span>
            ),
        },
        {
            key: 'duplicate',
            label: (
                <span>
                    Tao Bản Sao Công Việc
                </span>
            ),
        },

    ];
    // MOre Task
    const handleMoreTask = (e) => {
        if (e.key === 'remove-task') {
            // xóa project
            setShowConfirmModal(true);


        } else if (e.key === 'duplicate') {
            // hiện tai dang duplicate dựa trên task chưa onChange
            onDuplicate(data)
        } else {

        }
    };
    const handleRemoveTask = () => {

        dispatch(setDeleteTask({id: data.id, sprintId: sprint.id, columnId: data.columnId, boardId: data.boardId}))
        setShowConfirmModal(false)
    }
    const handleChangeStatus = (value) => {
        setStatus({...status, value})
        // post API Update Task
        console.log('Post API :', {...data, columnId: value})
        //onUpdateTask({...data, columnId:value})
    }
    useEffect(() => {
        // post API Update Task
        // console.log('Open: ',isOpen)
        onUpdateTask({
            ...data,
            title: taskTitle,
            columnId: status.value,
            priority:priority,
            point,
            startTime: dayjs(rangeValueTime[0], "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
            , endTime: dayjs(rangeValueTime[1], "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
        })

    }, [taskTitle,status,priority,rangeValueTime,point])
    // DEBUG HERE
    // console.log(status)
    return (
        <div className='detail-task'>
            <div className='header'>
                <div className='name-task'>
                    <FaDesktop className='icon'/>
                    <Input
                        size='middle'
                        type='text'
                        placeholder='Điền tên công việc'
                        className='input-title-task'
                        value={taskTitle}
                        spellCheck={false}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        onClick={ e=>e.target.focus()}
                        onMouseDown={e => e.preventDefault()}

                    />
                </div>
                <Dropdown className='dropdown-more' menu={{
                    items,
                    onClick: handleMoreTask,
                }}
                          placement="bottomRight">
                    <div><FaEllipsisH/></div>
                </Dropdown>


            </div>
            <div className='content'>
                <div className='status'>
                    <span className='title'>Trạng Thái: </span>
                    <Select
                        className={`status-${status.value}`}
                        defaultValue={status.label}
                        style={{
                            width: 180,
                            padding: 0,
                        }}
                        dropdownStyle={{
                            padding: 5,
                            fontSize: '0.9rem',
                        }}
                        onChange={handleChangeStatus}
                    >
                        {!!listStateRender && listStateRender.map((item) => (
                            <Select.Option key={item.value}
                                           style={{
                                               marginTop: '0.2rem',
                                               backgroundColor: item.backgroundColor,
                                               color: item.color,
                                               ':hover': {
                                                   backgroundColor: '#67ef79',
                                               },
                                           }}
                                           className='pre-item'><FaCheckCircle
                                style={{marginRight: '0.5rem'}}/>{item.label}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div className='gr-01'>
                    <div className='duration'>
                        <p>Thời Hạn :</p>
                        <RangePicker
                            presets={rangePresets}
                            showTime
                            format="DD/MM/YYYY HH:mm:ss"
                            onChange={onRangeChange}
                            className="range-date"
                            defaultValue={rangeValueTime}
                        />

                    </div>
                    <div className='priority'>
                        <p>Độ Ưu Tiên :</p>
                        <Select
                            className={`select-proiority-${priority}`}
                            defaultValue={data.priority}
                            style={{
                                width: 180,
                                padding: 0,
                            }}
                            dropdownStyle={{
                                padding: 5,
                                fontSize: '0.9rem',
                            }}
                            onChange={(e) => setPriority(e)}
                        >
                            {listPriority.map((item) => (
                                <Select.Option key={item.value}
                                               style={{
                                                   marginTop: '0.2rem',
                                                   backgroundColor: item.backgroundColor,
                                                   color: item.color,
                                                   ':hover': {
                                                       backgroundColor: '#67ef79',
                                                   },
                                               }}
                                               className='pre-item'><FaRegFlag
                                    style={{marginRight: '0.5rem'}}/>{item.label}</Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='gr-02'>
                    <div className='members'>
                        <p>Thực Hiện :</p>
                        <GroupMember onMembers={setMembers}/>

                    </div>
                    <div className='notification'>
                        <p>Điểm :</p>
                        <InputNumber min={1} max={20} defaultValue={3} value={point} onChange={e=>setPoint(e.target.value)}/>
                    </div>

                </div>
                <div className='description'>
                    <p>Nội Dung Công Việc:</p>
                    <CustomEditor id="description" editorDescription={editorDescription}
                                  defaultValues={data.description}/>
                </div>
                <div className='todo-list'>

                    <ToDoList list={data.todoList}/>
                </div>
                <div className='attach-file'>
                    <Upload
                        action="http://localhost:3000/"
                        listType="picture"
                        defaultFileList={listFile}
                        multiple
                        onChange={handleChangeUpload}
                    >
                        <button className='btn-upload'>
                            <FaPaperclip className='icon'/>
                            <span className='title'>Tải lên tệp đính kèm</span>
                        </button>
                    </Upload>
                    {!isEmpty(listFile) && (<div className='title-upload'>Tệp đính kèm ({listFile.length})
                        <FaCaretDown className='icon' onClick={handleHiddenListFile}/>
                    </div>)}
                </div>
                <div className='activity-task'>
                    <div className='description'>

                    </div>
                    <div className='comments'>

                    </div>
                </div>
            </div>


            <div className='footer'></div>
            <ConfirmModal open={showConfirmModal} title='Xác Nhận Xóa'
                          content={`Bạn Có Thực Sự Muốn Xóa Công Việc Này ? `}
                          textCancel='Hủy' textOK='Xóa' onCancel={() => setShowConfirmModal(false)}
                          onOK={handleRemoveTask}/>
        </div>
    )
        ;
}

export default DetailTask;