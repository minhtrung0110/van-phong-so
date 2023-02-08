import React from 'react';
import PropTypes from 'prop-types';

const AutoSendMail = props => {
  const {className,email} = props

  const handleAutoSendMail = (email) => {
    window.location.href = `mailto:${email}?subject=Hello.Nice to Meet You&body=message%20goes%20here`
  }
  return (
    <span className={className}  onClick={()=>handleAutoSendMail(email)}>
      {email}
    </span>
  );
};

AutoSendMail.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AutoSendMail;