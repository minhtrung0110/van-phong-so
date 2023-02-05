
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/commoms/Popper';
import {forwardRef, useRef, useState} from 'react'
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);


function Menu({children,items, hideOnClick=false, }) {
    console.log({children,items, hideOnClick, })
    const renderItems=()=>{
        return items.map((item,index)=>{
              return   <MenuItem data={item} key={index} />
    })
    }
    return ( 
        <Tippy
         
      
        interactive='true'
        placement="bottom-end"
        hideOnClick={hideOnClick}
        delay={[0,700]}
        offset={[12, 2]}
        render={(attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
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