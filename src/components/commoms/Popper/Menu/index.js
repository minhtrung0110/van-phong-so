import { faCircleXmark, faSearch, faSpinner, faSign, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper/';
import {useState} from 'react'
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import Header from './Header'

const cx = classNames.bind(styles);

const defaultFn=() => {}

function Menu({children,items=[], onChange=defaultFn, hideOnClick=false, }) {

    const [history,setHistory]= useState([{data:items}])
    const current=history[history.length-1]
   
    const renderItems=()=>{
        return current.data.map((item,index)=>{
           const isParent=!!item.children
              return   <MenuItem data={item} key={index} onClick={()=>{
                if(isParent){
                    setHistory((prev)=> [...prev,item.children])
                }else {
                    onChange(item)
                }
              }}/>
    })
    }
    return ( 
        <Tippy
         
      
        interactive
        placement="bottom-end"
        hideOnClick={hideOnClick}
        delay={[0,700]}
        offset={[12, 8]}
        onHide={()=>{setHistory(prev=>prev.slice(0,1))}}
        render={(attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
               { (history.length>1) && <Header title="Language"  onBack={()=>{
                setHistory(prev=> prev.slice(0,prev.length-1))
               }}  />}
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