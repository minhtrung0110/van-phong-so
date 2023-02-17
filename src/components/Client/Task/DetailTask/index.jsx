import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, DatePicker, Modal, Select, Tooltip} from "antd";
import {useSelector} from "react-redux";
import {detailStaffSelector} from "~/redux/selectors/task/taskSelector";
import {FaDesktop, FaFemale, FaMale, FaPlus, FaRegFlag} from "react-icons/fa";
import './Detail.scss'
import dayjs from "dayjs";
import CustomEditor from "~/components/commoms/Edittor";

DetailTask.propTypes = {};

function DetailTask() {
    const data = useSelector(detailStaffSelector)
    const [errorDescription, setErrorDescription] = useState('');
    const [priority,setPriority] = useState ()
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
            value: 'high',
            color: '#e94040',
            backgroundColor:'rgba(233,64,64,.12)'
        },
        {
            label: 'Trung Bình',
            value: 'middle',
            color: '#fa8c16',
            backgroundColor:'rgba(250,140,22,.12)'
        },
        {
            label: 'Thấp',
            value: 'low',
            color: '#18baff',
            backgroundColor:'rgba(24,186,255,.12)'
        },
        {
            label: 'Không ưu tiên',
            value: 'none',
            color: '#a9a8a8',
            backgroundColor:'#f5f7f9'
        },
    ]
    return (
        <div className='detail-task'>
            <div className='header'>
                <div className='name-task'>
                    <FaDesktop className='icon'/>
                    <h4>{data.title}</h4>
                </div>
            </div>
            <div className='content'>
                <div className='gr-01'>
                    <div className='duration'>
                        <RangePicker
                            presets={rangePresets}
                            showTime
                            format="DD/MM/YYYY HH:mm:ss"
                            onChange={onRangeChange}
                            className="range-date"
                        />

                    </div>
                    <div className='priority'>
                        <Select
                            className={`select-proiority-${priority}`  }
                            defaultValue="Không ưu tiên"
                            style={{
                                width: 180,
                                padding: 0,
                            }}
                            dropdownStyle={{
                                padding: 5,
                                fontSize: '0.9rem',
                            }}
                            onChange={(e)=>setPriority(e)}
                        >
                            {!!listPriority && listPriority.map((item) => (
                                <span key={item.value}
                                      style={{
                                          marginTop:'0.2rem',
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
                            <Avatar.Group >
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
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
                                        icon={<FaMale />}
                                    />
                                </Tooltip>
                                <Avatar
                                    style={{
                                        backgroundColor: '#1890ff',
                                    }}
                                    icon={<FaFemale />}
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
                    <CustomEditor id="description" editorDescription={editorDescription} />
                </div>
                <div className='todo-list'>

                </div>
                <div className='attach-file'>

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