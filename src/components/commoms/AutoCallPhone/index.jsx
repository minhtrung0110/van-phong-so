import React from 'react';
import PropTypes from 'prop-types';

const AutoCallPhone = (props) => {
  const {className,phoneNumber} = props;
  const handleAutoCallPhone=(phoneNumber) => {
    window.open(`tel:${phoneNumber}`)
  }
  return (
    <span className={className} onClick={()=>handleAutoCallPhone(phoneNumber)}>
      {phoneNumber}
    </span>
  );
};
AutoCallPhone.propTypes = {
  phoneNumber: PropTypes.string.isRequired  }
export default AutoCallPhone;