
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/commoms/Popper';
import {forwardRef, useRef, useState} from 'react'
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);


function Menu({children,items, hideOnClick=false, }) {

    const renderItems=()=>{
        return items.map((item,index)=>{
            return <div className={cx('filter-item')} key={item.id}>
                    <span className={cx('filter-title')}>{item.label}</span>
                {
                    item.content
                }
            </div>
              // return   <MenuItem data={item} key={index} />
    })
    }
    return ( 
        <Tippy
            visible
            showOnInit={true}
        interactive='true'
        placement="bottom-end"
        hideOnClick={hideOnClick}
            zIndex={999}
        delay={[0,700]}
        offset={[12, 2]}
        render={(attrs) => (
            <div className={cx('menu-list')}
                 style={{
                     width:'26rem'
                 }}
                 tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <div className={cx('menu-body')}>
                        {
                            renderItems()
                        }
                    </div >
                </PopperWrapper>
              
            </div>
        )}
    >

        {children}
    </Tippy>
     );
}

export default Menu;