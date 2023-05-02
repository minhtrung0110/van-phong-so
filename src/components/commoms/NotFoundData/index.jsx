import PropTypes from 'prop-types';
import { Navigate, NavLink } from 'react-router-dom';
import NotFound from '~/asset/images/not_found.jpg';
import styles from './NotFound.module.scss'
import classNames from "classnames/bind";
import  React from "react"

const cx=classNames.bind(styles)
export default function NotFoundData(props) {
  return (
    <div className={cx('box-notfound')}>
      <img
        src={NotFound}
        alt="Not Found"
        width={props.widthImage ? props.widthImage : '300px'}
        height="100%"
        className={cx("notfound-img")}
      />
      <h4 className={cx("notfound-title")}>Không tìm thấy dữ liệu</h4>
      {props.btnLink && (
        <div>
          <NavLink to="/product" className="font-24px">
            {props.btnLink}
          </NavLink>
        </div>
      )}
    </div>
  );
}

NotFoundData.propTypes = {
  widthImage: PropTypes.string,
};
