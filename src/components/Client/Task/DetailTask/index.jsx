import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, DatePicker, Modal, Select, Tooltip, Upload} from "antd";
import {useSelector} from "react-redux";
import {detailTaskSelector} from "~/redux/selectors/task/taskSelector";
import {
    FaAngleDown,
    FaCaretDown,
    FaCheckCircle,
    FaDesktop,
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
import {setDetailTask} from "~/redux/reducer/task/taskReducer";
import {getListNameColumn, getNameColumn} from "~/utils/sorts";
import {initialData} from "~/asset/data/initalDataTask";
import {listColorStateDefaults} from "~/asset/data/defaullt_data_task";

DetailTask.propTypes = {};

function DetailTask() {
    const data = useSelector(detailTaskSelector)
    const [errorDescription, setErrorDescription] = useState('');
    const [priority, setPriority] = useState(data.priority)
    const [status, setStatus] = useState(getNameColumn(initialData.boards, data.columnId, data.boardId))
    const [listFile, setListFile] = useState([])
    const {RangePicker} = DatePicker;
    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    }
    const editorDescription = (value) => {
        //  setValue('description', value);nay2y2 cho form
        setErrorDescription('');
    };
    const listPriority = [
        {
            label: 'Cao',
            value: 'highly',
            color: '#e94040',
            backgroundColor: 'rgba(233,64,64,.12)'
        },
        {
            label: 'Trung Bình',
            value: 'middle',
            color: '#fa8c16',
            backgroundColor: 'rgba(250,140,22,.12)'
        },
        {
            label: 'Thấp',
            value: 'low',
            color: '#18baff',
            backgroundColor: 'rgba(24,186,255,.12)'
        },
        {
            label: 'Không ưu tiên',
            value: 'none',
            color: '#a9a8a8',
            backgroundColor: '#f5f7f9'
        },
    ]
    const listState = getListNameColumn(initialData.boards, data.boardId)
    const listStateRender = listState.map((item, index) => ({
        label: item.label,
        value:item.id,
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

    // Upload

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

    return (
        <div className='detail-task'>
            <div className='header'>
                <div className='name-task'>
                    <FaDesktop className='icon'/>
                    <h4>{data.title}</h4>
                </div>
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
                        onChange={(e) => setStatus({...status,value:e})}
                    >
                        {!!listStateRender && listStateRender.map((item) => (
                            <span key={item.value}
                                  style={{
                                      marginTop: '0.2rem',
                                      backgroundColor: item.backgroundColor,
                                      color: item.color,
                                      ':hover': {
                                          backgroundColor: '#67ef79',
                                      },
                                  }}
                                  className='pre-item'><FaCheckCircle
                                style={{marginRight: '0.5rem'}}/>{item.label}</span>
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
                        />

                    </div>
                    <div className='priority'>
                        <p>Độ Ưu Tiên :</p>
                        <Select
                            className={`select-proiority-${priority}`}
                            defaultValue={priority}
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
                            {!!listPriority && listPriority.map((item) => (
                                <span key={item.value}
                                      style={{
                                          marginTop: '0.2rem',
                                          backgroundColor: item.backgroundColor,
                                          color: item.color,
                                          ':hover': {
                                              backgroundColor: '#67ef79',
                                          },
                                      }}
                                      className='pre-item'><FaRegFlag
                                    style={{marginRight: '0.5rem'}}/>{item.label}</span>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='gr-02'>
                    <div className='members'>
                        <p>Thực Hiện :</p>
                        <div className='avatar-group'>
                            <Avatar.Group>
                                <Avatar src="https://joeschmoe.io/api/v1/random"/>
                                <a href="https://ant.design">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#f56a00',
                                        }}
                                    >
                                        K
                                    </Avatar>
                                </a>
                                <Tooltip title="Ant User" placement="top">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<FaMale/>}
                                    />
                                </Tooltip>
                                <Avatar
                                    style={{
                                        backgroundColor: '#1890ff',
                                    }}
                                    icon={<FaFemale/>}
                                />
                            </Avatar.Group>

                            <button className='add-member'><FaPlus/></button>
                        </div>

                    </div>
                    <div className='notification'>

                    </div>

                </div>
                <div className='description'>
                    <p>Nội Dung Công Việc:</p>
                    <CustomEditor id="description" editorDescription={editorDescription}/>
                </div>
                <div className='todo-list'>

                    <ToDoList/>
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
                    <div className='comment'>

                    </div>
                </div>
            </div>


            <div className='footer'></div>
        </div>
    )
        ;
}

export default DetailTask;