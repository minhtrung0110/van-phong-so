import React from 'react';
import styles from './ListPageSkeleton.module.scss'
import classNames from "classnames/bind";
import { Skeleton,} from "antd";
import TableSkeleton from "~/components/commoms/Skeleton/Table";

const cx=classNames.bind(styles)
function ListTableSkeleton({column,lengthItem=5}) {
    return (
          <div className={cx('page-list-item')}>
              <div className={cx('title')}>
                  <Skeleton.Input active={true} size={'small'} className={cx('text')} />
              </div>
              <div className={cx('header')}>
                   <div className={cx('filter')}>
                       <Skeleton.Input active={true} size={'default'} />
                       <Skeleton.Input active={true} size={'default'} />
                   </div>
                  <div className={cx('search')}>
                      <Skeleton.Input active={true} size={'default'} />
                      <Skeleton.Button active={true} size={'default'} />
                      <Skeleton.Button active={true} size={'default'} />
                  </div>
              </div>
              <div className={cx('content')}>
                 <TableSkeleton column={column} lengthItem={lengthItem}/>
              </div>
              <div className={cx('footer')}>
                  <div className={cx('pagination')}>
                      <Skeleton.Button active={true} size={'default'} />
                      <Skeleton.Input active={true} size={'default'} />
                      <Skeleton.Button active={true} size={'default'} />
                  </div>
              </div>
          </div>
    );
}

export default ListTableSkeleton

//className={cx('')}