import classNames from "classnames/bind";
import styles from './Button.module.scss'
import {Link} from 'react-router-dom'
const cx= classNames.bind(styles)


function Button({to,hreaf,
    primary=false,outline=false,text=false,
    small=false,large=false ,rounded=false,
    disabled=false,
    leftIcon,rightIcon,
    children,onClick,className, ...passProps}) {
    let Component = 'button'
    const props={
        onClick,
        ...passProps,
    }
    if(to){
        props.to=to
        Component=Link
    }
    else if(hreaf){
        props.hreaf=hreaf
        Component='a'
    }
    // xữ lý logic với nút bi disabled=> sẽ xoá các event bắt đầu từ 'oN'
    else if(disabled){
        Object.keys(props).forEach((key)=>{
            if(key.startsWith('on') && typeof props[key]=== 'function')
            delete props[key]
        })
    }
    const classes=cx('wrapper',{
        [className]:className,
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        

    })
    return ( 
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')} >{leftIcon}</span>}
            <span className={cx('title')} >{children}</span>
            {rightIcon && <span className={cx('icon')} >{rightIcon}</span>}
        </Component>
     );
}

export default Button;