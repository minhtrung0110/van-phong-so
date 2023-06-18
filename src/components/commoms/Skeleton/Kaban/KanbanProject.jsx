import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from "antd";
import styles from "./KanbanProjectSeketon.module.scss"
import classNames from "classnames/bind";

KanbanProjectSkeleton.propTypes = {};
const cx = classNames.bind(styles)

function KanbanProjectSkeleton(props) {
    return (
        <div className={cx('page-kaban-item')}>
            <div className={cx('title')}>
                <Skeleton.Input active={true} size={'small'} className={cx('text')}/>
            </div>
            <div className={cx('header')}>
                <Skeleton.Input active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
                <Skeleton.Input active={true} size={'default'}/>
                <Skeleton.Input active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
                <Skeleton.Button active={true} size={'default'}/>
            </div>
            <div className={cx('content')}>
                <div className={cx('column')}>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                </div>
                <div className={cx('column')}>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                </div>
                <div className={cx('column')}>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                </div>
                <div className={cx('column')}>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                </div>
                <div className={cx('column-end')}>
                    <Skeleton.Input className={cx('task-item')} active={true} size={'default'}/>
                </div>
            </div>

        </div>
    );
}

export default KanbanProjectSkeleton;