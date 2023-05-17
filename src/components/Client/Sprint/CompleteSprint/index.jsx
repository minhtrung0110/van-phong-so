import React from 'react';
import PropTypes from 'prop-types';
import {FaChartLine, FaStarOfDavid, FaTrophy} from "react-icons/fa";
import './style.scss'
CompleteSprint.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
};

function CompleteSprint({onCancel,onComplete}) {
    return (
        <div className='notify-complete-sprint'>
            <div className='header-complete-sprint'>
                <div className='info-title'>
                    <FaTrophy className="icon"/>
                    <span className={'title'}>Hoàn Thành Chu Kỳ</span>
                </div>
            </div>
            <div className='content-complete-sprint'>
                <h4 className={'title'}><FaChartLine className='icon' />Thống Kê</h4>
                <ul className={'statistics'}>
                    <li className={'statistic-item'}> <FaStarOfDavid className={'icon-statistic-item'} /> Tổng Số Công Việc: </li>
                    <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} /> Công Việc Hoàn Thành: </li>
                    <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} /> Thời Gian Triển Khai: </li>
                </ul>
                <span className={'description'}>
                            Các công việc chưa hoàn thành sẽ được duy chuyển vào <b>Lưu Trữ</b>.
                        </span>
            </div>
            <div className={'footer-complete-sprint'}>
                <button className={'btn-complete'} onClick={onComplete}>Hoàn Thành</button>
                <button className={'btn-cancel'} onClick={() => onCancel(false)}>Hủy</button>
            </div>

        </div>
    );
}

export default CompleteSprint;