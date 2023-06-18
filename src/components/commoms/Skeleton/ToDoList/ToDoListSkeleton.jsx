import React from 'react';

import styles from './ToDoListSkeleton.module.scss'
import classNames from "classnames/bind";
import {Skeleton} from "antd";

const cx = classNames.bind(styles)
function ToDoListSkeleton() {
    return (
        <div className={cx('todolist-skeleton')}>
                    <div className={cx('group')}>
                        <Skeleton.Button className={cx('todo-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('todo-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('todo-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('todo-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('todo-item')} active={true} size={'default'}/>
                    </div>



        </div>
    );
}

export default ToDoListSkeleton;